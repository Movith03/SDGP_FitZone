const mongoose = require('mongoose');

const UserDietSchema = mongoose.Schema({
  userid: {
    type: String,
    required: [true, 'A user must have id'],
    unique: true,
  },

  dietid: {
    type: String,
    required: [true, 'A user must schedule id'],
  },
});

const UserDiet = mongoose.model('UserDiet', UserDietSchema);

module.exports = UserDiet;
