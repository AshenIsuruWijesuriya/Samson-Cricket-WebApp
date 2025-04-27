const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// Verify this is the correct path to your controller file.
// If your file structure is different, adjust the path accordingly.

// Route to create a new feedback
router.post('/', feedbackController.createFeedback);

// Route to get all feedback (for all users)
router.get('/', feedbackController.getAllFeedback);

// Route to get a single feedback by ID
router.get('/:id', feedbackController.getFeedbackById);

// Route to update a feedback by ID (admin only) -  Keep this admin-only if that's the intent
router.put('/:id', feedbackController.updateFeedback);

// Route to delete a feedback by ID (admin only) - Keep this admin-only
router.delete('/:id', feedbackController.deleteFeedback);

// Route to update feedback status by ID (admin only) - Keep this admin-only
router.patch('/:id/status', feedbackController.updateFeedbackStatus);

// Route to get feedback by User ID
router.get('/user/:id/feedback', feedbackController.getFeedbackByUserId);

module.exports = router;
