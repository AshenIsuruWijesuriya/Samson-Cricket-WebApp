const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  userPhone: { type: String, required: true },
  coachType: { type: String, required: true },
  preferredDate: { type: Date, required: true },
  preferredTime: { type: String, required: true },
  notes: { type: String },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const coachSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    contactNumber: { type: String, required: true },
    experience: { type: String, required: true },
    status: {
      type: String,
      enum: ["available", "unavailable"],
      default: "available",
    },
    coachType: {
      type: [String],
      enum: ["1 to 1 coaching", "online coaching", "academic coaching"],
      required: true,
    },
    images: [{ type: String }],
    description: { type: String },

    // Nested Sessions
    sessions: [sessionSchema],
  },
  { collection: "coaches" }
);

module.exports = mongoose.model("Coach", coachSchema);
