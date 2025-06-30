const WorkoutDetails = require('../Model/WorkoutDetailsModel');

exports.createWorkoutDetails = async (req, res) => {
  try {
    const data = await WorkoutDetails.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        workoutDetails: data,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.getAllWorkoutDetails = async (req, res) => {
  try {
    const workoutDetails = await WorkoutDetails.find();

    res.status(200).json({
      status: 'success',
      results: workoutDetails.length,
      data: {
        workoutDetails,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.getWorkoutDetail = async (req, res) => {
  try {
    const workoutDetail = await WorkoutDetails.findById(req.params.id);

    if (!workoutDetail) {
      return res.status(404).json({
        status: 'fail',
        message: 'No workout detail found with that ID',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        workoutDetail,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.updateWorkoutDetail = async (req, res) => {
  try {
    const workoutDetail = await WorkoutDetails.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // Return the modified document
        runValidators: true, // Validate before updating
      },
    );

    if (!workoutDetail) {
      return res.status(404).json({
        status: 'fail',
        message: 'No workout detail found with that ID',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        workoutDetail,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.deleteWorkoutDetail = async (req, res) => {
  try {
    const workoutDetail = await WorkoutDetails.findByIdAndDelete(req.params.id);

    if (!workoutDetail) {
      return res.status(404).json({
        status: 'fail',
        message: 'No workout detail found with that ID',
      });
    }

    res.status(204).json({
      status: 'success',
      data: null, // No content to send back
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};
