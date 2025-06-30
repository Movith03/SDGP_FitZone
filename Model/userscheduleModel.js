const mongoose = require('mongoose');

const userScheduleSchema = mongoose.Schema({
  userid: {
    type: String,
    required: [true, 'A user must have id'],
    unique: true,
  },

  scheduleid: {
    type: String,
    required: [true, 'A user must schedule id'],
  },
});

const UserSchedule = mongoose.model('UserSchedule', userScheduleSchema);

module.exports = UserSchedule;
