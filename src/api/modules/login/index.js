'use strict';

const router = require('express').Router();
const loginController = require('./controllers/login.controller');

router.post('/', loginController.post);

module.exports = router;



