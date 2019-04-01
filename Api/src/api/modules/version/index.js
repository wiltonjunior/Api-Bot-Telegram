'use strict';

const router = require('express').Router();
const VersionController = require('./controllers/version.controller');

router.get('/', VersionController.getVersion);

module.exports = router;



