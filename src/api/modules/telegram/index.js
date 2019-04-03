'use strict';

const router = require('express').Router();
const telegramController = require('./controllers/telegram.controller');

router.post('/', telegramController.post);

module.exports = router;



