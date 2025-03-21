const CricketProtectionGear = require("../models/protectionModel");
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

exports.createGear = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Multer upload error:", err);
      return res
        .status(400)
        .json({ message: "Error uploading images", error: err.message });
    }

    try {
      const { brand, model, specialType, sizeType, price, description, stock, category } =
        req.body;
      const images = req.files ? req.files.map((file) => file.filename) : [];

      const newGear = new CricketProtectionGear({
        category,
        brand,
        model,
        specialType,
        sizeType,
        price,
        description,
        images,
        stock,
      });

      const savedGear = await newGear.save();
      res.status(201).json(savedGear);
    } catch (error) {
      console.error("Error creating gear:", error);
      res.status(400).json({ message: error.message });
    }
  });
};

exports.getAllGear = async (req, res) => {
  try {
    const gear = await CricketProtectionGear.find();
    res.status(200).json(gear);
  } catch (error) {
    console.error("Error getting all gear:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getGearById = async (req, res) => {
  try {
    const gear = await CricketProtectionGear.findById(req.params.id);
    if (!gear) {
      return res.status(404).json({ message: "Gear not found" });
    }
    res.status(200).json(gear);
  } catch (error) {
    console.error("Error getting gear by ID:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateGear = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Multer upload error:", err);
      return res
        .status(400)
        .json({ message: "Error uploading images", error: err.message });
    }

    try {
      const { brand, model, specialType, sizeType, price, description, stock, category } = req.body;
      let images = req.files ? req.files.map((file) => file.filename) : [];
      if (req.body.existingImages) {
        if (typeof req.body.existingImages === 'string') {
          images = images.concat(req.body.existingImages);
        } else {
          images = images.concat(req.body.existingImages);
        }
      }

      const updatedGear = await CricketProtectionGear.findByIdAndUpdate(
        req.params.id,
        {
          category,
          brand,
          model,
          specialType,
          sizeType,
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

      if (!updatedGear) {
        return res.status(404).json({ message: "Gear not found" });
      }

      res.status(200).json(updatedGear);
    } catch (error) {
      console.error("Error updating gear:", error);
      res.status(400).json({ message: error.message });
    }
  });
};

exports.deleteGear = async (req, res) => {
  try {
    const deletedGear = await CricketProtectionGear.findByIdAndDelete(
      req.params.id
    );
    if (!deletedGear) {
      return res.status(404).json({ message: "Gear not found" });
    }
    res.status(200).json({ message: "Gear deleted successfully" });
  } catch (error) {
    console.error("Error deleting gear:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateGearStock = async (req, res) => {
  try {
    const { stock } = req.body;
    const updatedGear = await CricketProtectionGear.findByIdAndUpdate(
      req.params.id,
      { stock: stock },
      { new: true, runValidators: true }
    );
    if (!updatedGear) {
      return res.status(404).json({ message: "Gear not found" });
    }
    res.status(200).json(updatedGear);
  } catch (error) {
    console.error("Error updating gear stock:", error);
    res.status(400).json({ message: error.message });
  }
};
