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
  },
  { collection: "bats" } // Specify the collection name here
);

module.exports = mongoose.model("CricketBat", cricketBatSchema); // Model name is "CricketBat"