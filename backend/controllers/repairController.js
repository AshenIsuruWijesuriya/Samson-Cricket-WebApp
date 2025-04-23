const RepairRequest = require('../models/repairModel');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Create a new repair request
const createRepairRequest = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.id;

        const { repairType, details, phoneNumber } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const repairRequest = new RepairRequest({
            userId: userId,
            firstName: user.firstname,
            lastName: user.lastname,
            email: user.email,
            phoneNumber: phoneNumber,
            repairType: repairType,
            details: details,
        });

        await repairRequest.save();
        res.status(201).json(repairRequest);
    } catch (error) {
        console.error("Error creating repair request:", error);
        res.status(400).json({ message: error.message });
    }
};

// Get all repair requests (Ser-Manager only)
const getAllRepairRequests = async (req, res) => {
    try {
        const repairRequests = await RepairRequest.find();
        res.json(repairRequests);
    } catch (error) {
        console.error("Error getting all repair requests:", error);
        res.status(500).json({ message: error.message });
    }
};

// Get a single repair request by ID
const getRepairRequestById = async (req, res) => {
    try {
        const repairRequest = await RepairRequest.findById(req.params.id);
        if (!repairRequest) {
            return res.status(404).json({ message: 'Repair request not found' });
        }
        res.json(repairRequest);
    } catch (error) {
        console.error("Error getting repair request by ID:", error);
        res.status(500).json({ message: error.message });
    }
};

// Update a repair request by ID 
const updateRepairRequest = async (req, res) => {
    try {
        const repairRequest = await RepairRequest.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!repairRequest) {
            return res.status(404).json({ message: 'Repair request not found' });
        }
        res.json(repairRequest);
    } catch (error) {
        console.error("Error updating repair request:", error);
        res.status(400).json({ message: error.message });
    }
};

// Delete a repair request by ID 
const deleteRepairRequest = async (req, res) => {
    try {
        const repairRequest = await RepairRequest.findByIdAndDelete(req.params.id);
        if (!repairRequest) {
            return res.status(404).json({ message: 'Repair request not found' });
        }
        res.json({ message: 'Repair request deleted' });
    } catch (error) {
        console.error("Error deleting repair request:", error);
        res.status(500).json({ message: error.message });
    }
};

// Update repair request status by ID 
const updateRepairRequestStatus = async (req, res) => {
    try {
        const repairRequest = await RepairRequest.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true, runValidators: true }
        );
        if (!repairRequest) {
            return res.status(404).json({ message: 'Repair request not found' });
        }
        res.json(repairRequest);
    } catch (error) {
        console.error("Error updating repair request status:", error);
        res.status(400).json({ message: error.message });
    }
};

// Get repair requests by User ID
const getRepairRequestsByUserId = async (req, res) => {
    try {
        const repairRequests = await RepairRequest.find({ userId: req.params.id }); // Find all repair requests for the user
        if (!repairRequests || repairRequests.length === 0) {
            return res.status(404).json({ message: "No repair requests found for this user" });
        }
        res.status(200).json(repairRequests);
    } catch (error) {
        console.error("Error getting user repair requests:", error);
        res.status(500).json({ message: "Failed to get user repair requests" });
    }
};

module.exports = {
    createRepairRequest,
    getAllRepairRequests,
    getRepairRequestById,
    updateRepairRequest,
    deleteRepairRequest,
    updateRepairRequestStatus,
    getRepairRequestsByUserId,
};