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

exports.bookSession = async (req, res) => {
  try {
    const coachId = req.params.id;
    const coach = await Coach.findById(coachId);
    if (!coach) return res.status(404).json({ message: "Coach not found" });

    const session = {
      userName: req.body.userName,
      userEmail: req.body.userEmail,
      userPhone: req.body.userPhone,
      coachType: req.body.coachType,
      preferredDate: req.body.preferredDate,
      preferredTime: req.body.preferredTime,
      notes: req.body.notes,
    };

    coach.sessions.push(session);
    await coach.save();

    res.status(200).json({ message: "Session booked successfully", session });
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Admin: get all sessions
exports.getAllSessions = async (req, res) => {
  try {
    const coaches = await Coach.find({}, "name sessions");
    const allSessions = coaches.flatMap((coach) =>
      coach.sessions.map((session) => ({
        coachId: coach._id,
        coachName: coach.name,
        ...session.toObject(),
      }))
    );
    res.status(200).json(allSessions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: update session
exports.updateSession = async (req, res) => {
  try {
    const { coachId, sessionId } = req.params;
    const coach = await Coach.findById(coachId);
    if (!coach) return res.status(404).json({ message: "Coach not found" });

    const session = coach.sessions.id(sessionId);
    if (!session) return res.status(404).json({ message: "Session not found" });

    Object.assign(session, req.body);
    await coach.save();

    res.status(200).json({ message: "Session updated", session });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: delete session
// Delete a session from a coach
exports.deleteSession = async (req, res) => {
  try {
    const { coachId, sessionId } = req.params;

    const coach = await Coach.findById(coachId);
    if (!coach) {
      return res.status(404).json({ message: "Coach not found" });
    }

    const session = coach.sessions.id(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    session.deleteOne(); // Use deleteOne for subdocument removal (Mongoose 6+)
    await coach.save();

    res.status(200).json({ message: "Session deleted successfully" });
  } catch (err) {
    console.error("Error deleting session:", err);
    res.status(500).json({ message: "Server error while deleting session" });
  }
};
