const mongoose = require("mongoose");

const shoesSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    category: {
        type: String,
        required: true,
    },
    size: {
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
  { collection: "shoes" } // Specify the collection name here
);

// Pre-save middleware to update status based on stock
shoesSchema.pre("save", function (next) {
  if (this.stock > 0) {
    this.status = "in stock";
  } else {
    this.status = "out of stock";
  }
  next();
});

module.exports = mongoose.model("Shoe", shoesSchema); 