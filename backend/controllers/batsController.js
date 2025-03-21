// batsController.js
const CricketBat = require("../models/batsModel");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }).array("images", 10);

exports.createBat = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Multer upload error:", err);
      return res.status(400).json({ message: "Error uploading images", error: err.message });
    }

    try {
      const { brand, model, woodType, grade, weight, price, description, stock } = req.body;
      const images = req.files ? req.files.map((file) => file.filename) : [];

      const newBat = new CricketBat({
        brand,
        model,
        woodType,
        grade,
        weight,
        price,
        description,
        images,
        stock,
      });

      const savedBat = await newBat.save();
      res.status(201).json(savedBat);
    } catch (error) {
      console.error("Error creating bat:", error);
      res.status(400).json({ message: error.message });
    }
  });
};

exports.getAllBats = async (req, res) => {
  try {
    const bats = await CricketBat.find();
    res.status(200).json(bats);
  } catch (error) {
    console.error("Error getting all bats:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getBatById = async (req, res) => {
  try {
    const bat = await CricketBat.findById(req.params.id);
    if (!bat) {
      return res.status(404).json({ message: "Bat not found" });
    }
    res.status(200).json(bat);
  } catch (error) {
    console.error("Error getting bat by ID:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateBat = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Multer upload error:", err);
      return res.status(400).json({ message: "Error uploading images", error: err.message });
    }

    try {
      const { brand, model, woodType, grade, weight, price, description, stock } = req.body;
      let images = req.files ? req.files.map((file) => file.filename) : [];
      if (req.body.existingImages) {
        if(typeof req.body.existingImages === 'string'){
          images = images.concat(req.body.existingImages);
        } else {
          images = images.concat(req.body.existingImages);
        }
      }

      const updatedBat = await CricketBat.findByIdAndUpdate(
        req.params.id,
        {
          brand,
          model,
          woodType,
          grade,
          weight,
          price,
          description,
          images,
          stock,
        },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!updatedBat) {
        return res.status(404).json({ message: "Bat not found" });
      }

      res.status(200).json(updatedBat);
    } catch (error) {
      console.error("Error updating bat:", error);
      res.status(400).json({ message: error.message });
    }
  });
};

exports.deleteBat = async (req, res) => {
  try {
    const deletedBat = await CricketBat.findByIdAndDelete(req.params.id);
    if (!deletedBat) {
      return res.status(404).json({ message: "Bat not found" });
    }
    res.status(200).json({ message: "Bat deleted successfully" });
  } catch (error) {
    console.error("Error deleting bat:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateBatStock = async (req, res) => {
  try {
    const { stock } = req.body;
    const updatedBat = await CricketBat.findByIdAndUpdate(
      req.params.id,
      { stock: stock },
      { new: true, runValidators: true }
    );
    if (!updatedBat) {
      return res.status(404).json({ message: "Bat not found" });
    }
    res.status(200).json(updatedBat);
  } catch (error) {
    console.error("Error updating bat stock:", error);
    res.status(400).json({ message: error.message });
  }
};
exports.updateStockAfterPayment = async (req, res) => {
  try {
    const items = req.body; // Array of { batId: String, quantity: Number }
    console.log("Items received to update stock:", items); // Added logging

    if (!Array.isArray(items)) {
      return res.status(400).json({ message: "Invalid input: Expected an array of items" });
    }

    for (const item of items) {
      if (!item.batId || item.quantity === undefined || item.quantity === null) {
        return res.status(400).json({ message: "Invalid input: Each item must have 'batId' and 'quantity'" });
      }

      const bat = await CricketBat.findById(item.batId);
      if (!bat) {
        return res.status(404).json({ message: `Bat with ID ${item.batId} not found` });
      }

      if (bat.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for bat ID ${item.batId}` });
      }

      bat.stock -= item.quantity;
      await bat.save();
      console.log(`Stock updated for bat ID ${item.batId}. New stock: ${bat.stock}`); // Added logging
    }

    res.status(200).json({ message: "Stock levels updated successfully" });
  } catch (error) {
    console.error("Error updating stock after payment:", error);
    res.status(500).json({ message: "Internal server error", error: error.message }); // Include error message
  }
};
