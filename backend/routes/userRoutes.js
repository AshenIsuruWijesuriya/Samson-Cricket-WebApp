const express = require('express');
const { registerUser  } = require('../controllers/userController'); // Adjust the path as necessary

const router = express.Router();

// Register user route
router.post('/register', registerUser );

module.exports = router;