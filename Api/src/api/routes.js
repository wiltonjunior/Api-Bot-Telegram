'use strict';;

module.exports = app => {
    app.use('/api/v1/todo', require('./modules/toDo'));
    app.use('/api/v1/login', require('./modules/login'))
    app.use('/api/v1', require('./modules/version'))
}