const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// user schema 
const userSchema = new mongoose.Schema({
    email: {
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
    firebaseId: {
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

userSchema.statics.findUserByFirebaseId = async(firebaseId) => {
    const user = await User.findOne({ firebaseId });
    if(!user) {
        throw new Error('User not found!');
    }
    return user;
}

// member functions
userSchema.methods.generateAuthToken = async function() {
    try {
        const token_string = jwt.sign({ _id: this._id.toString() }, process.env.AUTH_STRING);
        this.tokens = [...this.tokens, { token_string }];
        await this.save();
        return token_string;
    } catch(error){
        throw new Error(error.message);
    }
}

userSchema.methods.toJSON = function () {
    const user = this.toObject();
    // remove tokens attribute
    delete user.tokens;
    // return user object
    return user;
}

const User = mongoose.model('User', userSchema);

module.exports = User;