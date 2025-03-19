const mongoose = require("mongoose");

const repairRequestSchema = new mongoose.Schema(
  {
    name: {
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
      enum: ['Pending','Accepted' ,'Cancelled', 'In Progress', 'Completed',], // Add status field
      default: 'Pending',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: 'repairRequests' } // Specify the collection name here
);

module.exports = mongoose.model("RepairRequest", repairRequestSchema);