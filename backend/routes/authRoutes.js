const express = require('express');
const { signUp } = require('../controllers/authController'); // Adjust the path as necessary

const router = express.Router();

// Sign up route
router.post('/signup', signUp);

module.exports = router;