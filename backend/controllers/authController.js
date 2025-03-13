const User = require('../models/User'); // Adjust the path as necessary
const bcrypt = require('bcrypt');

// Sign up controller
exports.signUp = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser  = await User.findOne({ email });
        if (existingUser ) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser  = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword, // Store the hashed password
            role: 'Normal User', // Default role
        });

        // Save the user to the database
        await newUser .save();

        // Respond with success message
        res.status(201).json({ message: 'User  registered successfully', user: newUser  });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};