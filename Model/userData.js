const mongoose = require('mongoose');

const userDataSchema = mongoose.Schema({
  userid: {
    type: String,
    required: [true, 'A user must have id'],
    unique: true,
  },

  age: {
    type: Number,
    required: [true, 'A user must have age'],
  },

  currentweight: {
    type: Number,
    required: [true, 'A user must have weight'],
  },

  goalweight: {
    type: Number,
    required: [true, 'A user must have goal weight'],
  },

  goalbodytype: {
    type: String,
    required: [true, 'A user must have goal body'],
  },

  currentbodytype: {
    type: String,
    required: [true, 'A user must have current body shap'],
  },

  allergicfoods: [String],
  workouttime: {
    type: String,
    // required : [true , "A user must have work out time"]
  },

  workoutdays: [String],
  workoutduration: Number,
  diet: String,
  height: Number,
  muscleGoal: String,
  experiencelevel: {
    type: String,
    required: [true, 'A user must have experience level'],
  },
});

const UserData = mongoose.model('UserData', userDataSchema);

module.exports = UserData;
