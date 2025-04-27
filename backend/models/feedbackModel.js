const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  feedbackType: {
    type: String,
    enum: ["Bug Report", "Feature Request", "General Feedback", "Praise", "Complaint"],
    required: true,
  },
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Open", "In Progress", "Closed", "Resolved"],
    default: "Closed",
  },
}, {
    collection: "feedback",
    timestamps: true,
});

feedbackSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
