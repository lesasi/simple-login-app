const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// user schema 
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error('Age can\'t be negative!')
            }
        }
    },
    password: {
        type: String,
        trim: true
    },
    googleId: {
        type: String,
        default: null
    },
    tokens: [{
        token_string: {
            type:String
        }
    }]
}, {
    timestamps: true
});

// middleware
userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        if(this.password === '') {
            this.password = null;
            next();
        }
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

// static functions
userSchema.statics.findUserByCredentials = async ({ username, password }) => {
    const user = await User.findOne({ username });
    if(!user){
        throw new Error('Custom:Username not found!');
    }
    if(user.password === null) {
        throw new Error('Password not set for user, login through google');
    }
    const match = await bcrypt.compare(password, user.password);
    if(!match){
        throw new Error('Custom:Incorrect password!');
    }
    return user;
}

userSchema.statics.findUserByGoogleId = async(googleId) => {
    const user = await User.findOne({ googleId });
    if(!user) {
        return null;
    }
    return user;
}

// member functions
userSchema.methods.generateAuthToken = async function() {
    try{
        const token_string = jwt.sign({ _id: this._id.toString() }, process.env.AUTH_STRING);
        this.tokens = [...this.tokens, { token_string }];
        await this.save();
        return token_string;
    }catch(error){
        throw new Error(error.message);
    }
}

userSchema.methods.toJSON = function () {
    const user = this.toObject();
    // remove tokens and password attributes
    delete user.tokens;
    delete user.password;
    // return user object
    return user;
}

userSchema.methods.isPasswordMatching = async function (password) {
    const match = await bcrypt.compare(password, this.password);
    return match;
}

const User = mongoose.model('User', userSchema);

module.exports = User;