const express = require('express');
const {
  createMerchandise,
  getAllMerchandise,
  getMerchandiseById,
  updateMerchandise,
  deleteMerchandise,
  updateMerchandiseStock,
  updateStockAfterPayment,
} = require('../controllers/merchController'); // Adjust the path

const router = express.Router();

router.post('/', createMerchandise);
router.get('/', getAllMerchandise);
router.get('/:id', getMerchandiseById);
router.put('/:id', updateMerchandise);
router.delete('/:id', deleteMerchandise);
router.patch('/:id/stock', updateMerchandiseStock);
router.put('/update-stock-after-payment', updateStockAfterPayment);

module.exports = router;