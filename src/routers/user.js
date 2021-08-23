const express = require('express');

const User = require('../models/user');
const auth = require('../middleware/auth');
const generateErrMessage = require('../util/generateErrMessage');
const firebase = require('../util/firebase');

const router = express.Router();

// make new user
router.post('/new-user', async (req, res) => {
    try {
        // Receive token from Frontend with Firebase Token, and user details
        const token = req.body.token;
        const result = await firebase.auth().verifyIdToken(token);
        req.body.firebaseId = result.uid;

        // Now, create user object using the request body
        const user = new User(req.body);
        const auth_token = await user.generateAuthToken();

        // Send to user
        res.cookie(process.env.AUTH_COOKIE, auth_token);
        res.status(201).send({ user });
    } catch(error){
        res.status(400).send({ error: generateErrMessage(error.message) });
    }
});

router.post('/login', async (req, res) => {
    try {
        const token = req.body.token;
        const result = await firebase.auth().verifyIdToken(token);

        // get user object and generate token
        const user = await User.findUserByFirebaseId(result.uid);
        const auth_token = await user.generateAuthToken();

        // Send the user details to client
        res.cookie(process.env.AUTH_COOKIE, auth_token);
        res.send({ user });
    } catch(error){
        res.status(400).send({error: generateErrMessage(error.message)});
    }
});

// get current user details(using token)
router.get('/users/me', auth, async (req, res) => {
    res.send({ user: req.user });
}); 

router.post('/users/me/edit', auth, async (req, res) => {
    const allowedUpdates = ['age', 'name'];
    const user = req.user;
    const updatesArr = Object.keys(req.body);
    try {
        for(let i = 0; i < updatesArr.length; i++) {
            const key = updatesArr[i];
            if(!allowedUpdates.includes(key)) {
                throw new Error(`Key [${key}] not allowed!`);
            }
            user[key] = req.body[key];
        };
        await user.save();
        res.send({ user });
    } catch (error) {
        res.status(403).send({error: generateErrMessage(error.message)});
    }
}); 

// add google token to a user - FIX
router.post('/setGoogleToken', auth, async (req, res) => {
    try{
        const token = req.body.token;
        const result = await firebase.auth().verifyIdToken(token);
        // set uid to user's firebaseId
        req.user.firebaseId = result.uid;
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

// FIX
router.post('/users/me/delete', auth, async (req, res) => {
    try {
        await req.user.remove();
        // delete from google auth
        if(!!req.user.firebaseId) {
            await firebase.auth().deleteUser(req.user.firebaseId);
        }
        res.send({ user: req.user });
    } catch (error) {
        return res.status(400).send(error);
    } 
});

module.exports = router;