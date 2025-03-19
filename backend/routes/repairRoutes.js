const express = require('express');
const {
  createRepairRequest,
  getAllRepairRequests,
  getRepairRequestById,
  updateRepairRequest,
  deleteRepairRequest,
  updateRepairRequestStatus,
} = require('../controllers/repairController'); // Adjust the path

const router = express.Router();

// Create a new repair request
router.post('/create-repair', createRepairRequest);

// Get all repair requests
router.get('/repair-requests', getAllRepairRequests);

// Get a single repair request by ID
router.get('/repair-requests/:id', getRepairRequestById);

// Update a repair request by ID
router.put('/update-repair/:id', updateRepairRequest);

// Delete a repair request by ID
router.delete('/delete-repair/:id', deleteRepairRequest);

// Update repair request status by ID
router.patch('/update-repair-status/:id', updateRepairRequestStatus);

module.exports = router;