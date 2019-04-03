'use strict';

const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
    key: { type: String, required: true  },
});

module.exports = mongoose.model('login', LoginSchema);