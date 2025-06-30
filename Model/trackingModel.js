const mongoose = require('mongoose');

const trackingSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  exerciseid: {
    type: String,
    required: true,
  },
  completedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Tracking = mongoose.model('Tracking', trackingSchema);

module.exports = Tracking;
