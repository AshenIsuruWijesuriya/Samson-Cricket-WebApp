const Coach = require("../models/coachModel"); // Adjust the path as needed
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Ensure a separate directory for coach images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }).array("images", 10);

exports.addCoach = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Multer upload error:", err);
      return res
        .status(400)
        .json({ message: "Error uploading images", error: err.message });
    }

    try {
      const {
        name,
        email,
        contactNumber,
        experience,
        status,
        coachType,
        description,
      } = req.body;
      const images = req.files ? req.files.map((file) => file.filename) : [];

      const newCoach = new Coach({
        name,
        email,
        contactNumber,
        experience,
        status,
        coachType,
        images,
        description,
      });

      await newCoach.save();

      res.status(201).json({
        message: "Coach added successfully",
        coach: newCoach,
      });
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
        return res.status(400).json({ message: "Email already exists" });
      }
      console.error("Error adding coach:", error);
      res.status(400).json({ message: error.message });
    }
  });
};

exports.getAllCoaches = async (req, res) => {
  try {
    const coaches = await Coach.find();
    res.status(200).json(coaches);
  } catch (error) {
    console.error("Error getting all coaches:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getCoachById = async (req, res) => {
  try {
    const coach = await Coach.findById(req.params.id);
    if (!coach) {
      return res.status(404).json({ message: "Coach not found" });
    }
    res.status(200).json(coach);
  } catch (error) {
    console.error("Error getting coach by ID:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateCoachById = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Multer upload error:", err);
      return res
        .status(400)
        .json({ message: "Error uploading images", error: err.message });
    }

    try {
      const {
        name,
        email,
        contactNumber,
        experience,
        status,
        coachType,
        description,
      } = req.body;
      let images = req.files ? req.files.map((file) => file.filename) : [];
        if (req.body.existingImages) {
        if(typeof req.body.existingImages === 'string'){
          images = images.concat(req.body.existingImages);
        } else {
          images = images.concat(req.body.existingImages);
        }
      }

      const updatedCoach = await Coach.findByIdAndUpdate(
        req.params.id,
        {
          name,
          email,
          contactNumber,
          experience,
          status,
          coachType,
          images,
          description,
        },
        { new: true, runValidators: true }
      );

      if (!updatedCoach) {
        return res.status(404).json({ message: "Coach not found" });
      }

      res.status(200).json(updatedCoach);
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
        return res.status(400).json({ message: "Email already exists" });
      }
      console.error("Error updating coach:", error);
      res.status(400).json({ message: error.message });
    }
  });
};

exports.deleteCoachById = async (req, res) => {
  try {
    const deletedCoach = await Coach.findByIdAndDelete(req.params.id);
    if (!deletedCoach) {
      return res.status(404).json({ message: "Coach not found" });
    }
    res.status(200).json({ message: "Coach deleted successfully" });
  } catch (error) {
    console.error("Error deleting coach:", error);
    res.status(500).json({ message: error.message });
  }
};