const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// user schema 
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid");
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(value.length < 6){
                throw new Error('Password too short!!');
            }
        }
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
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

// static functions
userSchema.statics.findUserByCredentials = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if(!user){
        throw new Error('Not able to find user');
    }
    const match = await bcrypt.compare(password, user.password);
    if(!match){
        throw new Error('Passwords don\'t match!');
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
        throw new Error('Error in generating token');
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


const User = mongoose.model('User', userSchema);

module.exports = User;