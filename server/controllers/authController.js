const User = require('../models/User');
const { hashPassword, comparePassword } = require('../helpers/Auth');

const test = (req, res) => {
    res.json('Hello from the server!');
}

const registerUser = async (req, res) => {
   try {
        const { name, email, password } = req.body;
        if(!name) {
            return res.json({
                error: 'Name is required'
            })
        };

        if(!email) {
            return res.json({
                error: 'Email is required'
            })
        };

        if(!email && !name) {
            return res.json({
                error: 'Please fill the form'
            })
        };

        if(!password || password.length < 6) {
            return res.json({
                error: 'Password is required and should be at least 6 characters long'
            })
        };

        const exist = await User.findOne({email});
        if(exist) {
            return res.json({
                error: 'Email is take already'
            })
        };

        const hashedPassword = await hashPassword(password);
        const user = await User.create({
            name, 
            email, 
            password: hashedPassword
        })

        return res.json(user);
   } catch (error) {
        console.log(error);
   }
}

module.exports = {
    test,
    registerUser
}
