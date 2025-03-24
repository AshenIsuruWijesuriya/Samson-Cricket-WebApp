const express = require('express');
const {
  createShoe,
  getAllShoes,
  getShoeById,
  updateShoe,
  deleteShoe,
  updateShoeStock,
  updateStockAfterPayment,
} = require('../controllers/shoeController');

const router = express.Router();

router.post('/', createShoe);
router.get('/', getAllShoes);
router.get('/:id', getShoeById);
router.put('/:id', updateShoe);
router.delete('/:id', deleteShoe);
router.patch('/:id/stock', updateShoeStock);
router.put('/update-stock-after-payment', updateStockAfterPayment);

module.exports = router;
