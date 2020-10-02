const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

router.get("/test", (req, res) => {
    res.send("Working..");
});

router.post("/register", async (req, res) => {
    try {
        let { email, password, passwordCheck, displayName } = req.body;

        if (!email || !password || !passwordCheck)
            return res.status(400).json({ msg: "Not all field have been entered." });
        if (password.length < 5)
            return res
                .status(400)
                .json({ msg: "The password needs to be at least 5 character long." });
        if (password !== passwordCheck)
            return res
                .status(400)
                .json({ msg: "Enter the same password twice for verification." });

        const existingUser = await User.findOne({ email: email });
        if (existingUser)
            return res
                .status(400)
                .json({ msg: "An accont with this email already exists." });

        if (!displayName) displayName = email;

        const salt = await bcrypt.genSaltSync(10);
        const passwordHast = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: passwordHast,
            displayName
        });
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;