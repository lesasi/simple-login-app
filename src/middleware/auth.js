const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async(req, res, next) => {
    try {
        // get auth token off of request object
        const token = req.cookies[process.env.AUTH_COOKIE] || req.header('Authorization').replace("Bearer ", "");
        // get id from token using auth_string
        const decoded = jwt.verify(token, process.env.AUTH_STRING);
        // get user with this id and with this token - if no token present in user, don't log in
        const user = await User.findOne({ _id: decoded._id, 'tokens.token_string': token });
        if(!user){  
            throw new Error('User or token not found');
        }
        // setting new user in req object
        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(500).send({ error: "Please login" })
    }   
}

module.exports = auth;