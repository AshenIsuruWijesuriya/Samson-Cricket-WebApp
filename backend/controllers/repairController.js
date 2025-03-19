const RepairRequest = require('../models/repairModel'); // Adjust the path as needed

// Create a new repair request
exports.createRepairRequest = async (req, res) => {
  try {
    const repairRequest = new RepairRequest(req.body);
    await repairRequest.save();
    res.status(201).json(repairRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all repair requests
exports.getAllRepairRequests = async (req, res) => {
  try {
    const repairRequests = await RepairRequest.find();
    res.json(repairRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single repair request by ID
exports.getRepairRequestById = async (req, res) => {
  try {
    const repairRequest = await RepairRequest.findById(req.params.id);
    if (!repairRequest) {
      return res.status(404).json({ message: 'Repair request not found' });
    }
    res.json(repairRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a repair request by ID
exports.updateRepairRequest = async (req, res) => {
  try {
    const repairRequest = await RepairRequest.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!repairRequest) {
      return res.status(404).json({ message: 'Repair request not found' });
    }
    res.json(repairRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a repair request by ID
exports.deleteRepairRequest = async (req, res) => {
  try {
    const repairRequest = await RepairRequest.findByIdAndDelete(req.params.id);
    if (!repairRequest) {
      return res.status(404).json({ message: 'Repair request not found' });
    }
    res.json({ message: 'Repair request deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update repair request status by ID
exports.updateRepairRequestStatus = async (req, res) => {
  try {
    const repairRequest = await RepairRequest.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!repairRequest) {
      return res.status(404).json({ message: 'Repair request not found' });
    }
    res.json(repairRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};