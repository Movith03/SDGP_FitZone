const mongoose = require('mongoose');

const scheduleSchema = mongoose.Schema({
  ScheduleName: {
    type: String,
    required: [true, 'A schedule must have a name'],
  },
  description: String,
  exercises: [
    {
      exerciseid: {
        type: String,
        required: [true, 'Exercise ID is required'],
      },
      sets: {
        type: Number,
        required: [true, 'Number of sets is required'],
      },
      reps: {
        type: Number,
        required: [true, 'Number of reps is required'],
      },
    },
  ],
  howtodo: String,
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
