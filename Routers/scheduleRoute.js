const express = require('express');
const scheduleController = require('../Controllers/scheduleController'); // Your controller file

const router = express.Router();

// Routes for Schedule operations
router
  .route('/')
  .post(scheduleController.CreateSche) // Create a schedule
  .get(scheduleController.getAllSchedules); // Get all schedules

router
  .route('/:id')
  .get(scheduleController.getSchedule) // Get a schedule by ID
  .patch(scheduleController.updateSchedule) // Update a schedule by ID
  .delete(scheduleController.deleteSchedule); // Delete a schedule by ID

module.exports = router;
