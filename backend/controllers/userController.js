const User = require('../models/userModel'); // Adjust the path as necessary
const bcrypt = require('bcryptjs');

exports.registerUser  = async (req, res) => {
    const { firstname, lastname, email, password, role} = req.body;

    console.log('Received data:', req.body); // Log the received data

    try {
        const existingUser  = await User.findOne({ email });
        if (existingUser ) {
            return res.status(400).json({ message: 'User  already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser  = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            role
        });

        await newUser .save();
        res.status(201).json({ message: 'User  registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};