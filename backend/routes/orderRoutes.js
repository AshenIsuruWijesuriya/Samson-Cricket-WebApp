const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Create a new order
router.post("/create-order", orderController.createOrder);

// Update an existing order (by order ID)
router.put("/:id", orderController.updateOrder);

// Get a specific order by order ID
router.get("/order-by/:id", orderController.getOrderById);

// Get all orders (admin only)
router.get("/", orderController.getAllOrders);

// Delete an order (by order ID, admin only)
router.delete("/:id", orderController.deleteOrder);

// Get orders by user ID
router.get("/user-orders/:id", orderController.getOrdersByUserId); // Added this route

// Route to download the invoice for a specific order
router.get("/invoice/:orderId", orderController.downloadInvoice);

module.exports = router;