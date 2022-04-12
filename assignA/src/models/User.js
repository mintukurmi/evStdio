const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// env config 
dotenv.config();

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        },
    }]
}, {
    timestamps: true
})


// hiding sensitive info from user
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    
    delete userObject.password;
    delete userObject.tokens;

    return userObject;
};

userSchema.statics.getUserByCredentials = async (username, password) => {
    
    const user = await User.findOne({ username });

    if(!user){
        throw new Error("User not found")
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!user) {
        throw new Error("User not found");
    }

    if(!isMatch){
        throw new Error("Username/Password might be wrong");
    }

    return user;
}

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    console.log("user", user)
    const token = jwt.sign( { _id: user._id.toString() }, process.env.JWT_SECRET, {
        expiresIn: '3h'
    });

    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}


const User = mongoose.model("User", userSchema);
module.exports = User;