const mongoose = require('mongoose');

const WorkoutDetailsSchema = mongoose.Schema({
  userid: {
    type: String,
    required: [true, 'A exsecise requie'],
    unique: true,
  },
  scheduleid: Number,
});

const WorkoutDetails = mongoose.model('WorkoutDetails', WorkoutDetailsSchema);

module.exports = WorkoutDetails;
