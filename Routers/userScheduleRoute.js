const express = require('express');
const Workout = require('../Controllers/userScheduleController');

const router = express.Router();

router.route('/').post(Workout.Workout);

router.route('/:id').get(Workout.getUserSchedule);

module.exports = router;
