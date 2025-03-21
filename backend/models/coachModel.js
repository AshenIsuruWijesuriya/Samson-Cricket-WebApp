const mongoose = require("mongoose");

const coachSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure email uniqueness
      lowercase: true, // Store emails in lowercase
    },
    contactNumber: {
      type: String,
      required: true,
    },
    experience: {
      type: String, // e.g., "5 years", "10+ years"
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "unavailable"],
      default: "available",
    },
    coachType: {
      type: [String], // Allows multiple coach types
      enum: ["1 to 1 coaching", "online coaching", "academic coaching"],
      required: true,
    },
    images: [{ type: String }], // Array of image URLs
    description: {
      type: String,
    },
  },
  { collection: "coaches" } // Specify the collection name
);

module.exports = mongoose.model("Coach", coachSchema);