const User = require("../models/User");
const bcrypt = require("bcryptjs");

//user signup handler
module.exports.userSignup = async (req, res) => {
    try {
        const userNameRegEx = /^[a-zA-Z0-9]*$/;
        const passwordRegEx = /^[-@.\/#&+\w\s]*$/;

        const {username, password } = req.body;

        if(!userNameRegEx.test(username) || username.length < 6 || username.length > 12) {
            throw new Error("Username should be of 6-12 characters. Allowed Characters [a-z], [A-Z], [0-9]"); 
        }

        if(!passwordRegEx.test(password) || password.length < 6) {
            throw new Error("Password should be atleast 6 characters. Allowed Characters [a-z, A-Z, 0-9] and few special characters")
        }

        const hashedPassword = bcrypt.hashSync(password, 8);
        const user = new User({username, password: hashedPassword});
        await user.save();

        res.send({ success: "User created", user });
    }
    catch(err){
        console.log(err);
        res.status(500).send({
            error: err.message
        })
    }
}

// user signin handler
module.exports.userSignin= async (req, res) => {
    try {
        const {username, password } = req.body;

        if(!username || !password) {
            throw new Error("Username & Password is required")
        }

        const user = await User.getUserByCredentials(username, password);
        const token = await user.generateAuthToken();

        res.send({ token , msg: "Login successfull"});
    }
    catch(err){
        console.log(err);
        res.status(500).send({
            error: err.message
        })
    }
}