const mongoose = require("mongoose");

const cricketBatSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    woodType: {
      type: String,
      required: true,
    },
    grade: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    images: [{ type: String }], // Array of image URLs
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
  { collection: "bats" } // Specify the collection name here
);

// Pre-save middleware to update status based on stock
cricketBatSchema.pre("save", function (next) {
  if (this.stock > 0) {
    this.status = "in stock";
  } else {
    this.status = "out of stock";
  }
  next();
});

module.exports = mongoose.model("CricketBat", cricketBatSchema); // Model name is "CricketBat"