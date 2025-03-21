const express = require('express');
const {
  createGear,
  getAllGear,
  getGearById,
  updateGear,
  deleteGear,
  updateGearStock,
} = require('../controllers/protectionController'); 

const router = express.Router();

router.post('/', createGear);
router.get('/', getAllGear);
router.get('/:id', getGearById);
router.put('/:id', updateGear);
router.delete('/:id', deleteGear);
router.patch('/:id/stock', updateGearStock);

module.exports = router;