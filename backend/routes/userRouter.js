const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { getUsers, registerUser, loginUser, deleteUser } = require('../controllers/users.controllers');
const auth = require('../middleware/auth');
const User = require('../models/userModel');

router.get("/test", (req, res) => {
    res.send("Working..");
});

router.route('/users')
    .get(getUsers);

router.route("/register")
    .post(registerUser);

router.route('/login')
    .post(loginUser);

router.delete('/delete', auth, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.user);
        res.json(deletedUser);
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/tokenIsValid', async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.json(false);
        
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) return res.json(false);

        const user = await User.findById(verified.id);
        if(!user) return res.json(false);

        return res.json(true);
    } catch (error) {
        res.status(500).json({ error: err.message });   
    }
});

module.exports = router;