const express = require('express');
const {
    registerUser,
    loginUser,
    getUserById,
    updateUser,
    deleteUser,
    getUsersByRole,
    sendOtp,
    verifyOtp,
    updatePassword,
} = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/role/:role', getUsersByRole);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/update-password', updatePassword);

module.exports = router;