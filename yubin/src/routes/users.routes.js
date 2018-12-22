const express = require('express');
const router = express.Router();

const User = require('../models/user');

//List users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.json(users)
});

//Sign in
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        email: email,
        password: password
    })
    
    if (user === null) {
        res.json({status: 'Incorrect user or password'});
    } else {
        res.send({status: 'Correct login!'});
    }

    console.log(user);
});

//Sign up
router.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const user = new User({firstName, lastName, email, password});
    await user.save();
    res.json({ status: 'New registered user'})
});

module.exports = router;