const Schedule = require('../Model/scheduleModel');

// Create a new schedule
exports.CreateSche = async (req, res) => {
  try {
    const newSchedule = await Schedule.create({
      ScheduleName: req.body.ScheduleName,
      description: req.body.description,
      exercises: req.body.exercises, // Array of objects with exerciseid, sets, reps
      howtodo: req.body.howtodo,
    });

    res.status(201).json({
      status: 'success',
      data: {
        schedule: newSchedule,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// Get all schedules
exports.getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find();

    res.status(200).json({
      status: 'success',
      results: schedules.length,
      data: {
        schedules,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// Get a single schedule by ID
exports.getSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);

    if (!schedule) {
      return res.status(404).json({
        status: 'fail',
        message: 'No schedule found with that ID',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        schedule,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// Update a schedule by ID
exports.updateSchedule = async (req, res) => {
  try {
    const updatedSchedule = await Schedule.findByIdAndUpdate(
      req.params.id,
      {
        ScheduleName: req.body.ScheduleName,
        description: req.body.description,
        exercises: req.body.exercises, // Array of objects with exerciseid, sets, reps
        howtodo: req.body.howtodo,
      },
      {
        new: true, // Return the updated document
        runValidators: true, // Validate before saving
      },
    );

    if (!updatedSchedule) {
      return res.status(404).json({
        status: 'fail',
        message: 'No schedule found with that ID',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        schedule: updatedSchedule,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// Delete a schedule by ID
exports.deleteSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.id);

    if (!schedule) {
      return res.status(404).json({
        status: 'fail',
        message: 'No schedule found with that ID',
      });
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};
