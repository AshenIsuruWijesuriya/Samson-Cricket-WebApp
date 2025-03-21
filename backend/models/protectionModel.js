const mongoose = require("mongoose");

const cricketProtectionGearSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["Helmet", "Batting Pads", "Wicket Keeping Pads","Gloves", "Bowl Guard", "Tie Pads", "Arm Guard"],
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    specialType: {
      type: String,
      enum: ["Left Handed", "Right Handed"],
      required: false,
    },
    sizeType: {
      type: String,
      enum: ["Adult", "Junior"],
      required: true, 
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    images: [{ type: String }],
    stock: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["in stock", "out of stock"],
      default: "out of stock",
    },
  },
  { collection: "protection_gear" }
);

cricketProtectionGearSchema.pre("save", function (next) {
  if (this.stock > 0) {
    this.status = "in stock";
  } else {
    this.status = "out of stock";
  }
  next();
});

module.exports = mongoose.model(
  "CricketProtectionGear",
  cricketProtectionGearSchema
);
