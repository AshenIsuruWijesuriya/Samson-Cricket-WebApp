const mongoose = require("mongoose");

const merchandiseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      enum: ["S", "M", "L", "XL", "XXL"],
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
  { collection: "merchandise" }
);

merchandiseSchema.pre("save", function (next) {
  if (this.stock > 0) {
    this.status = "in stock";
  } else {
    this.status = "out of stock";
  }
  next();
});

module.exports = mongoose.model("Merchandise", merchandiseSchema);
