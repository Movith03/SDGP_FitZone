const Exercise = require('../Model/exerciseModel');

exports.CreateEx = async (req, res) => {
  try {
    const data = await Exercise.create(req.body);

    res.status(201).json({
      status: 'success',
      message: {
        data: data,
      },
    });
  } catch (error) {
    res.status(401).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.getAllExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find();

    res.status(200).json({
      status: 'success',
      results: exercises.length,
      data: {
        exercises,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.getExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);

    if (!exercise) {
      return res.status(404).json({
        status: 'fail',
        message: 'No exercise found with that ID',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        exercise,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.updateExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the modified document
      runValidators: true, // Validate before updating
    });

    if (!exercise) {
      return res.status(404).json({
        status: 'fail',
        message: 'No exercise found with that ID',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        exercise,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.deleteExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndDelete(req.params.id);

    if (!exercise) {
      return res.status(404).json({
        status: 'fail',
        message: 'No exercise found with that ID',
      });
    }

    res.status(204).json({
      status: 'success',
      data: null, // No content
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};
