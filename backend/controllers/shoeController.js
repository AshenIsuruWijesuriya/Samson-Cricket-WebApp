const Shoe = require("../models/shoeModel");
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

exports.createShoe = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Multer upload error:", err);
      return res.status(400).json({ message: "Error uploading images", error: err.message });
    }

    try {
      const { brand, model, category, size, color, price, description, stock } = req.body;
      const images = req.files ? req.files.map((file) => file.filename) : [];

      const newShoe = new Shoe({
        brand,
        model,
        category,
        size,
        color,
        price,
        description,
        images,
        stock,
      });

      const savedShoe = await newShoe.save();
      res.status(201).json(savedShoe);
    } catch (error) {
      console.error("Error creating shoe:", error);
      res.status(400).json({ message: error.message });
    }
  });
};

exports.getAllShoes = async (req, res) => {
  try {
    const shoes = await Shoe.find();
    res.status(200).json(shoes);
  } catch (error) {
    console.error("Error getting all shoes:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getShoeById = async (req, res) => {
  try {
    const shoe = await Shoe.findById(req.params.id);
    if (!shoe) {
      return res.status(404).json({ message: "Shoe not found" });
    }
    res.status(200).json(shoe);
  } catch (error) {
    console.error("Error getting shoe by ID:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateShoe = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Multer upload error:", err);
      return res.status(400).json({ message: "Error uploading images", error: err.message });
    }

    try {
      const { brand, model, category, size, color, price, description, stock } = req.body;
      let images = req.files ? req.files.map((file) => file.filename) : [];
      if (req.body.existingImages) {
        if (typeof req.body.existingImages === 'string') {
          images = images.concat(req.body.existingImages);
        } else {
          images = images.concat(req.body.existingImages);
        }
      }

      const updatedShoe = await Shoe.findByIdAndUpdate(
        req.params.id,
        {
          brand,
          model,
          category,
          size,
          color,
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

      if (!updatedShoe) {
        return res.status(404).json({ message: "Shoe not found" });
      }

      res.status(200).json(updatedShoe);
    } catch (error) {
      console.error("Error updating shoe:", error);
      res.status(400).json({ message: error.message });
    }
  });
};

exports.deleteShoe = async (req, res) => {
  try {
    const deletedShoe = await Shoe.findByIdAndDelete(req.params.id);
    if (!deletedShoe) {
      return res.status(404).json({ message: "Shoe not found" });
    }
    res.status(200).json({ message: "Shoe deleted successfully" });
  } catch (error) {
    console.error("Error deleting shoe:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateShoeStock = async (req, res) => {
  try {
    const { stock } = req.body;
    const updatedShoe = await Shoe.findByIdAndUpdate(
      req.params.id,
      { stock: stock },
      { new: true, runValidators: true }
    );
    if (!updatedShoe) {
      return res.status(404).json({ message: "Shoe not found" });
    }
    res.status(200).json(updatedShoe);
  } catch (error) {
    console.error("Error updating shoe stock:", error);
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
      if (!item.shoeId || item.quantity === undefined || item.quantity === null) {
        return res.status(400).json({ message: "Invalid input: Each item must have 'shoeId' and 'quantity'" });
      }

      const shoe = await Shoe.findById(item.shoeId);
      if (!shoe) {
        return res.status(404).json({ message: `Shoe with ID ${item.shoeId} not found` });
      }

      if (shoe.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for shoe ID ${item.shoeId}` });
      }

      shoe.stock -= item.quantity;
      await shoe.save();
      console.log(`Stock updated for shoe ID ${item.shoeId}. New stock: ${shoe.stock}`);
    }

    res.status(200).json({ message: "Stock levels updated successfully" });
  } catch (error) {
    console.error("Error updating stock after payment:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
