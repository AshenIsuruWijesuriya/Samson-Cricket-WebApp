const Merchandise = require("../models/merchModel");
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

exports.createMerchandise = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Multer upload error:", err);
      return res.status(400).json({ message: "Error uploading images", error: err.message });
    }

    try {
      const { name, category, brand, size, price, description, stock } = req.body;
      const images = req.files ? req.files.map((file) => file.filename) : [];

      const newMerchandise = new Merchandise({
        name,
        category,
        brand,
        size,
        price,
        description,
        images,
        stock,
      });

      const savedMerchandise = await newMerchandise.save();
      res.status(201).json(savedMerchandise);
    } catch (error) {
      console.error("Error creating merchandise:", error);
      res.status(400).json({ message: error.message });
    }
  });
};

exports.getAllMerchandise = async (req, res) => {
  try {
    const merchandise = await Merchandise.find();
    res.status(200).json(merchandise);
  } catch (error) {
    console.error("Error getting all merchandise:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getMerchandiseById = async (req, res) => {
  try {
    const merchandise = await Merchandise.findById(req.params.id);
    if (!merchandise) {
      return res.status(404).json({ message: "Merchandise not found" });
    }
    res.status(200).json(merchandise);
  } catch (error) {
    console.error("Error getting merchandise by ID:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateMerchandise = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Multer upload error:", err);
      return res.status(400).json({ message: "Error uploading images", error: err.message });
    }

    try {
      const { name, category, brand, size, price, description, stock } = req.body;
      let images = req.files ? req.files.map((file) => file.filename) : [];
      if (req.body.existingImages) {
        if(typeof req.body.existingImages === 'string'){
          images = images.concat(req.body.existingImages);
        } else {
          images = images.concat(req.body.existingImages);
        }
      }

      const updatedMerchandise = await Merchandise.findByIdAndUpdate(
        req.params.id,
        {
          name,
          category,
          brand,
          size,
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

      if (!updatedMerchandise) {
        return res.status(404).json({ message: "Merchandise not found" });
      }

      res.status(200).json(updatedMerchandise);
    } catch (error) {
      console.error("Error updating merchandise:", error);
      res.status(400).json({ message: error.message });
    }
  });
};

exports.deleteMerchandise = async (req, res) => {
  try {
    const deletedMerchandise = await Merchandise.findByIdAndDelete(req.params.id);
    if (!deletedMerchandise) {
      return res.status(404).json({ message: "Merchandise not found" });
    }
    res.status(200).json({ message: "Merchandise deleted successfully" });
  } catch (error) {
    console.error("Error deleting merchandise:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateMerchandiseStock = async (req, res) => {
  try {
    const { stock } = req.body;
    const updatedMerchandise = await Merchandise.findByIdAndUpdate(
      req.params.id,
      { stock: stock },
      { new: true, runValidators: true }
    );
    if (!updatedMerchandise) {
      return res.status(404).json({ message: "Merchandise not found" });
    }
    res.status(200).json(updatedMerchandise);
  } catch (error) {
    console.error("Error updating merchandise stock:", error);
    res.status(400).json({ message: error.message });
  }
};

exports.updateStockAfterPayment = async (req, res) => {
  try {
    const items = req.body; 
    console.log("Items received to update stock:", items); 

    if (!Array.isArray(items)) {
      return res.status(400).json({ message: "Invalid input: Expected an array of items" });
    }

    for (const item of items) {
      if (!item.merchandiseId || item.quantity === undefined || item.quantity === null) {
        return res.status(400).json({ message: "Invalid input: Each item must have 'merchandiseId' and 'quantity'" });
      }

      const merchandise = await Merchandise.findById(item.merchandiseId);
      if (!merchandise) {
        return res.status(404).json({ message: `Merchandise with ID ${item.merchandiseId} not found` });
      }

      if (merchandise.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for merchandise ID ${item.merchandiseId}` });
      }

      merchandise.stock -= item.quantity;
      await merchandise.save();
      console.log(`Stock updated for merchandise ID ${item.merchandiseId}. New stock: ${merchandise.stock}`); // Added logging
    }

    res.status(200).json({ message: "Stock levels updated successfully" });
  } catch (error) {
    console.error("Error updating stock after payment:", error);
    res.status(500).json({ message: "Internal server error", error: error.message }); // Include error message
  }
};