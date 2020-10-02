const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res
            .status(400)
            .json({ msg: "Not all field have been entered." });

        const user = await User.findOne({ email: email });
        if(!user)
            return res
            .status(400)
            .json({ msg: "Not account with this email has been entered." });
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
            return res
            .status(400)
            .json({ msg: "Invalid credentials." });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({
            token,
            user: {
                id: user._id,
                displayName: user.displayName,
                email: user.email
            }
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

module.exports = router;