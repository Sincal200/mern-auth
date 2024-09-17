const User = require('../models/User');

const test = (req, res) => {
    res.json('Hello from the server!');
}

const registerUser = async (req, res) => {
   try {
        const { name, email, password } = req.body;
        if(!name ) {
            return res.json({
                error: 'Name is required'
            })
        };

        if(!password || password.length < 6) {
            return res.json({
                error: 'Password is required and should be at least 6 characters long'
            })
        };

        const exist = User.findOne({email});
        if(exist) {
            return res.json({
                error: 'Email is take already'
            })
        };

        const user = await User.create({
            name, email, password
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
