const Tracking = require('../Model/trackingModel');

exports.createTracking = async (req, res) => {
  try {
    const { userid, exerciseid } = req.body;

    const newTracking = await Tracking.create({
      userid,
      exerciseid,
      completedAt: new Date(), // Store the current date and time
    });

    res.status(201).json({
      status: 'success',
      data: {
        tracking: newTracking,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// Get all tracking records for a user
exports.getUserTracking = async (req, res) => {
  const userId = req.params.id;

  try {
    const trackingRecords = await Tracking.find({ userid: userId });

    if (!trackingRecords || trackingRecords.length === 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'No tracking records found for this user.',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        tracking: trackingRecords,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};
