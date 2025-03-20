// otpController.js
require('dotenv').config(); 
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const otpStorage = {};
const OTP_EXPIRATION_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds

exports.generateOtp = (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP

    otpStorage[email] = {
        otp: otp,
        timestamp: Date.now(),
    };

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP',
        text: `Your OTP is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ message: 'Failed to send OTP' });
        }
        console.log('Email sent:', info.response);
        res.json({ message: 'OTP sent successfully', otp: otp });
    });
};

exports.verifyOtp = (req, res) => {
    const { email, otp } = req.body;
    const storedOtpData = otpStorage[email];

    if (storedOtpData && storedOtpData.otp === otp) {
        if (Date.now() - storedOtpData.timestamp <= OTP_EXPIRATION_TIME) {
            delete otpStorage[email]; // Delete the OTP after verification
            return res.json({ message: 'OTP verified successfully' });
        } else {
            delete otpStorage[email];
            return res.status(400).json({ message: 'OTP expired' });
        }
    } else {
        return res.status(400).json({ message: 'Invalid OTP' });
    }
};