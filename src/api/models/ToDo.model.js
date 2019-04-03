'use strict';

const mongoose = require('mongoose');

const TuDoShema = new mongoose.Schema({
    name: { type: String, required: true },
    done: { type: Boolean, required: true }
});

module.exports = mongoose.model('toDo', TuDoShema);