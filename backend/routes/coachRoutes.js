const express = require('express');
const {
  addCoach,
  getAllCoaches,
  getCoachById,
  updateCoachById,
  deleteCoachById,
  bookSession,
  getAllSessions,
  updateSession,
  deleteSession,
} = require('../controllers/coachController');

const router = express.Router();

router.post('/', addCoach);
router.get('/', getAllCoaches);

// ⚠️ Place fixed routes BEFORE dynamic :id routes
router.get('/sessions', getAllSessions);
router.post('/:id/sessions', bookSession);
router.put('/:coachId/sessions/:sessionId', updateSession);
router.delete('/:coachId/sessions/:sessionId', deleteSession);

router.get('/:id', getCoachById);
router.put('/:id', updateCoachById);
router.delete('/:id', deleteCoachById);

module.exports = router;
