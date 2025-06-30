const express = require('express');
const trackingController = require('../Controllers/trackingController');

const router = express.Router();

router.route('/').post(trackingController.createTracking);
router.route('/:id').get(trackingController.getUserTracking);

module.exports = router;
