const mongoose = require("mongoose");

const repairRequestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    repairType: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Cancelled', 'In Progress', 'Completed'],
        default: 'Pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { collection: 'repairRequests' });

module.exports = mongoose.model("RepairRequest", repairRequestSchema);