const User = require('../models/userModel'); // Adjust the path as necessary
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

exports.loginUser  = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate a token (optional, but recommended for authentication)
        const token = jwt.sign({ id: user._id, role: user.role, firstname: user.firstname }, 'your_jwt_secret', { expiresIn: '1h' });

        // Send back user data and token
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};