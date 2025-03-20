// controllers/orderController.js
const Order = require("../models/orderModel");
const CricketBat = require("../models/batsModel"); // Ensure this matches your product model
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const createOrder = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;

    const { items, deliveryAddress, phoneNumber, paymentMethod, paymentDetails } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    for (const item of items) {
      const product = await CricketBat.findById(item.productId);
      if (!product) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      if (item.quantity <= 0) {
        return res.status(400).json({ message: "Invalid quantity" });
      }
      item.price = product.price;
      item.productModel = 'CricketBat'; //Ensure this matches the enum in your model.
    }

    const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);

    const order = new Order({
      userId: userId,
      firstName: user.firstname,
      lastName: user.lastname,
      email: user.email,
      items: items,
      totalAmount: totalAmount,
      deliveryAddress: deliveryAddress,
      phoneNumber: phoneNumber,
      paymentMethod: paymentMethod,
      paymentDetails: paymentDetails,
    });

    await order.save();

    res.status(201).json({ message: "Order created successfully", order: order });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Failed to create order", error: error.message });
  }
};

// Update an existing order
const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order updated successfully", order: order });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Failed to update order" });
  }
};

// Get an order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.productId");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error getting order:", error);
    res.status(500).json({ message: "Failed to get order" });
  }
};

// Get all orders (admin only)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("items.productId");

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error getting orders:", error);
    res.status(500).json({ message: "Failed to get orders" });
  }
};

// Delete an order (admin only)
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  updateOrder,
  getOrderById,
  getAllOrders,
  deleteOrder,
};