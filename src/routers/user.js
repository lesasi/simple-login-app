const express = require('express');

const User = require('../models/user');
const auth = require('../middleware/auth');
const generateErrMessage = require('../util/generateErrMessage');
const firebase = require('../util/firebase');

const router = express.Router();

// make new user
router.post('/new-user', async (req, res) => {
    try{
        // conditions - if this is new user as a result of google login, then password
        // is not necessary - check for googleId variable
        if(!req.body.googleId && !req.body.password) {
            throw new Error('Custom:Password not provided!')
        }
        const user = new User(req.body);
        const token = await user.generateAuthToken();
        if(req.header('User-Agent').includes('PostmanRuntime')){
            res.status(201).send({ user, token })
        }else {
            res.cookie(process.env.AUTH_COOKIE, token);
            res.status(201).send({ user });
        }
    }catch(error){
        res.status(400).send({ error: generateErrMessage(error.message) });
    }
});

// get current user details(using token)
router.get('/users/me', auth, async (req, res) => {
    res.send({ user: req.user });
}); 

// edit user
router.post('/users/me/edit', auth, async (req, res) => {
    const allowedUpdates = ['username', 'age', 'name', 'password'];
    const user = req.user;
    const updatesArr = Object.keys(req.body);
    try {
        for(let i =0; i < updatesArr.length; i++) {
            const key = updatesArr[i];
            if(!allowedUpdates.includes(key)) {
                throw new Error(`Key [${key}] not allowed!`);
            }
            user[key] = req.body[key];
        };
        await user.save();
        res.send(user);
    } catch (error) {
        res.status(403).send({error: generateErrMessage(error.message)});
    }
}); 

// login using username and password
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
        res.status(400).send({error: generateErrMessage(error.message)});
    }
});

router.post('/googleLogin', async (req, res) => {
    try{
        const token = req.body.token;
        const result = await firebase.auth().verifyIdToken(token);
        const user = await User.findUserByGoogleId(result.uid);
        // if new user - send id to user(DEV - make this jwt encoded)
        if(!user) {
            res.send({ googleId: result.uid, new_user: true });
            return;
        }
        // else, just send the user details to client, along with token(DEV)
        const auth_token = await user.generateAuthToken();
        res.cookie(process.env.AUTH_COOKIE, auth_token);
        res.send({ user });
    }catch(error){
        res.status(400).send({error: generateErrMessage(error.message)});
    }
});

// add google token to a user
router.post('/setGoogleToken', auth, async (req, res) => {
    try{
        const token = req.body.token;
        const result = await firebase.auth().verifyIdToken(token);
        // set uid to user's googleId
        req.user.googleId = result.uid;
        await req.user.save();
        res.send({ user: req.user })
    }catch(error){
        res.status(400).send({error: generateErrMessage(error.message)});
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
});

router.post('/users/me/delete', auth, async (req, res) => {
    try {
        await req.user.remove();
        // delete from google auth
        if(!!req.user.googleId) {
            await firebase.auth().deleteUser(req.user.googleId);
        }
        res.send({ user: req.user });
    } catch (error) {
        return res.status(400).send(error);
    } 
});

module.exports = router;