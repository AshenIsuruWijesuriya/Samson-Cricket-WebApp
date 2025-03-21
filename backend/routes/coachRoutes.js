const express = require('express');
const {
  addCoach,
  getAllCoaches,
  getCoachById,
  updateCoachById,
  deleteCoachById,
} = require('../controllers/coachController');

const router = express.Router();

router.post('/', addCoach);
router.get('/', getAllCoaches);
router.get('/:id', getCoachById);
router.put('/:id', updateCoachById);
router.delete('/:id', deleteCoachById);

module.exports = router;