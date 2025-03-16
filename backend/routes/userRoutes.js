const express = require('express');
const {
    registerUser,
    loginUser,
    getUserById,
    updateUser,
    deleteUser,
} = require('../controllers/userController');

const router = express.Router();

// Register user route
router.post('/register', registerUser);

// Login user route
router.post('/login', loginUser);

// Get user by ID route
router.get('/:id', getUserById);

// Update user route
router.put('/:id', updateUser);

// Delete user route
router.delete('/:id', deleteUser);

module.exports = router;