const express = require('express');
const dietplan = require('../Controllers/dietplanController');
const router = express.Router();

// POST route for adding a diet plan
router.route('/').post(dietplan.createDietPlan).get(dietplan.getAllDietPlans);
router.route('/:id').get(dietplan.getDietPlanById);

router.route('/userdiet').post(dietplan.userdietplan);
router.route('/userdiet/:id').get(dietplan.getuserdiet);

module.exports = router;
