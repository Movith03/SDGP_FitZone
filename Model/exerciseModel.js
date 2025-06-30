const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema({
  exseciseName: {
    type: String,
    required: [true, 'A exsecise requie'],
    unique: true,
  },
  description: String,
  video: [String],
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
