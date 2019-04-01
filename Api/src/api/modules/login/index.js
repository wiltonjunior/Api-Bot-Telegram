'use strict';

const router = require('express').Router();
const loginController = require('./controllers/login.controller');

router.post('/', loginController.post);
router.post('/newKey', loginController.createKey);

module.exports = router;



