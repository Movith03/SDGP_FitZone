const express = require('express');
const exerciseController = require('../Controllers/exerciseController'); // Your controller file

const router = express.Router();

// Routes for Exercise operations
router
  .route('/')
  .post(exerciseController.CreateEx) // Create an exercise
  .get(exerciseController.getAllExercises); // Get all exercises

router
  .route('/:id')
  .get(exerciseController.getExercise) // Get a specific exercise by ID
  .patch(exerciseController.updateExercise) // Update a specific exercise by ID
  .delete(exerciseController.deleteExercise); // Delete a specific exercise by ID

module.exports = router;
