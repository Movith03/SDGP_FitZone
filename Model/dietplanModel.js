// models/dietPlanModel.js
const mongoose = require('mongoose');

const dietPlanSchema = mongoose.Schema({
  planName: {
    type: String,
    required: [true, 'A diet plan must have a name'],
  },
  foods: [
    {
      foodName: {
        type: String,
        required: [true, 'Food name is required'],
      },
      instructions: {
        type: String,
        required: [true, 'Instructions for the food are required'],
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const DietPlan = mongoose.model('DietPlan', dietPlanSchema);

module.exports = DietPlan;
