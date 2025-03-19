const express = require('express');
const {
  createBat,
  getAllBats,
  getBatById,
  updateBat,
  deleteBat,
  updateBatStock,
} = require('../controllers/batsController'); 

const router = express.Router();

router.post('/', createBat);
router.get('/', getAllBats);
router.get('/:id', getBatById);
router.put('/:id', updateBat);
router.delete('/:id', deleteBat);
router.patch('/:id/stock', updateBatStock);

module.exports = router;