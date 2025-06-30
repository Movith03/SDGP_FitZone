const express = require('express');
const UserDataController = require('../Controllers/userDataController');

const router = express.Router();

router.route('/').post(UserDataController.createUserData);

module.exports = router;
