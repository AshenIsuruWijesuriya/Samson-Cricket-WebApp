const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.post("/create-order", orderController.createOrder);
router.put("/:id", orderController.updateOrder);
router.get("/:id", orderController.getOrderById);
router.get("/", orderController.getAllOrders);
router.delete("/:id", orderController.deleteOrder);

module.exports = router;