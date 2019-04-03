"use strict"

const express = require("express");
const mongoose = require("mongoose");

const app = express();

require('dotenv').config();
const port = process.env.PORT;
const urlMongoDb = process.env.MONGO_URL;

app.use(express.json());
require('./api/routes')(app);

(async () => {
    try {
        console.log(`Trying to connect to mongo on ${urlMongoDb}...`);
        await mongoose.connect(urlMongoDb, { useNewUrlParser: true });
        console.log('Mongo connected!');
        await app.listen(port)
        console.log(`Api connected port, ${port}!`);
    } catch(error) {
        console.log(`Error - ${error} !`);
    }
})();