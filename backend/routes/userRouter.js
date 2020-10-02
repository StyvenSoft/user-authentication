const router = require('express').Router();
const User = require('../models/userModel');

router.get("/test", (req, res) => {
    res.send("Working..");
});

router.post("/register", async (req, res) => {
    try {
        const { email, password, passwordCheck, displayName } = req.body;

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

        const existingUser = await User.find({ email: email });
        if (existingUser)
            return res
                .status(400)
                .json({ msg: "An accont with this email already exists." });

        if (!displayName) displayName = email;
    } catch (err) {
        res.status(500).json({ err });
    }
});

module.exports = router;