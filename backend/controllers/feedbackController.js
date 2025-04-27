const Feedback = require('../models/feedbackModel'); // Adjust the path if needed
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Create a new feedback
const createFeedback = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.id;

        const { feedbackType, subject, message } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const feedback = new Feedback({
            userId: userId,
            feedbackType,
            subject,
            message,
        });

        await feedback.save();
        res.status(201).json(feedback);
    } catch (error) {
        console.error("Error creating feedback:", error);
        res.status(400).json({ message: error.message });
    }
};

// Get all feedback (for all users)
const getAllFeedback = async (req, res) => {
    try {
        const feedbacks = await Feedback.find().populate('userId', 'firstname lastname email');
        res.status(200).json(feedbacks);
    } catch (error) {
        console.error("Error getting all feedback:", error);
        res.status(500).json({ message: "Failed to retrieve feedbacks", error: error.message });
    }
};

// Get a single feedback by ID
const getFeedbackById = async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id).populate('userId', 'firstname lastname email');
        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }
        res.json(feedback);
    } catch (error) {
        console.error("Error getting feedback by ID:", error);
        res.status(500).json({ message: error.message });
    }
};

// Update a feedback by ID (admin only -  check permissions if needed)
const updateFeedback = async (req, res) => {
    try {
        //  Add permission checks here.  For example:
        // const token = req.headers.authorization.split(' ')[1];
        // const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        // const userId = decodedToken.id;
        // const user = await User.findById(userId);
        // if (!user || user.role !== 'admin') {
        //   return res.status(403).json({ message: "Unauthorized" });
        // }

        const feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }
        res.json(feedback);
    } catch (error) {
        console.error("Error updating feedback:", error);
        res.status(400).json({ message: error.message });
    }
};

// Delete a feedback by ID (admin only - check permissions)
const deleteFeedback = async (req, res) => {
    try {
        // Add permission checks here
        const feedback = await Feedback.findByIdAndDelete(req.params.id);
        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }
        res.json({ message: 'Feedback deleted' });
    } catch (error) {
        console.error("Error deleting feedback:", error);
        res.status(500).json({ message: error.message });
    }
};

// Update feedback status by ID (admin only)
const updateFeedbackStatus = async (req, res) => {
    try {
        //  Add permission checks here.
        const feedback = await Feedback.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true, runValidators: true }
        );
        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }
        res.json(feedback);
    } catch (error) {
        console.error("Error updating feedback status:", error);
        res.status(400).json({ message: error.message });
    }
};

// Get feedback by User ID
const getFeedbackByUserId = async (req, res) => {
    try {
        const feedback = await Feedback.find({ userId: req.params.id }).populate('userId', 'firstname lastname email');
        if (!feedback || feedback.length === 0) {
            return res.status(404).json({ message: "No feedback found for this user" });
        }
        res.status(200).json(feedback);
    } catch (error) {
        console.error("Error getting user feedback:", error);
        res.status(500).json({ message: "Failed to get user feedback" });
    }
};

module.exports = {
    createFeedback,
    getAllFeedback,
    getFeedbackById,
    updateFeedback,
    deleteFeedback,
    updateFeedbackStatus,
    getFeedbackByUserId,
};
