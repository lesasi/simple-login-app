const express = require('express');

const User = require('../models/user');
const auth = require('../middleware/auth');

const router = express.Router();


// make new user
router.post('/new-user', async (req, res) => {
    const user = new User(req.body);
    try{
        const token = await user.generateAuthToken();
        if(req.header('User-Agent').includes('PostmanRuntime')){
            res.status(201).send({ user, token })
        }else {
            res.cookie(process.env.AUTH_COOKIE, token);
            res.status(201).send({ user });
        }
    }catch(error){
        res.status(400).send({error: error.message});
    }
});

// get current user details(using token)
router.get('/users/me', auth, async (req, res) => {
    res.send({ user: req.user });
}); 

// edit user
router.post('/users/me/edit', auth, async (req, res) => {
    const allowedUpdates = ['email', 'age', 'name', 'old_password', 'password'];
    const user = req.user;
    const updatesArr = Object.keys(req.body);
    try {
        // check if password is being updated, then old password should be as well
        if(updatesArr.includes('password') && !updatesArr.includes('old_password')) {
            throw new Error(`Current password not provided!`)
        }
        for(let i =0; i < updatesArr.length; i++) {
            const key = updatesArr[i];
            if(!allowedUpdates.includes(key)) {
                throw new Error(`Key [${key}] not allowed!`);
            }
            if(key === 'old_password') {
                const match = await user.isPasswordMatching(req.body[key]);
                if(!match) {
                    throw new Error('Incorrect password!')
                }
                continue;
            }
            user[key] = req.body[key];
        };
        await user.save();
        res.send(user);
    } catch (error) {
        res.status(403).send({error: error.message});
    }
}); 

// login using email and password
router.post('/login', async (req, res) => {
    try{
        const user = await User.findUserByCredentials(req.body);
        const token = await user.generateAuthToken();
        if(req.header('User-Agent').includes('PostmanRuntime')){
            res.cookie(process.env.AUTH_COOKIE, token);
            res.send({ user, token });
        }else {
            res.cookie(process.env.AUTH_COOKIE, token);
            res.send({ user });
        }
    }catch(error){
        res.status(400).send({error: error.message});
    }
});

// log out of current account
router.post('/logout', auth, async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter(token => token.token_string !== req.token);
        await req.user.save();
        res.send();
    }catch(error){
        res.status(400).send({error: error.message});
    } 
});

// log out of all accounts
router.post('/logout/all', auth, async (req, res) => {
    try{
        req.user.tokens = [];
        await req.user.save();
        res.send();
    }catch(error){
        res.status(400).send({error: error.message});
    } 
})

module.exports = router;