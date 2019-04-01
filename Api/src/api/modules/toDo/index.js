'use strict';

const router = require('express').Router();
const toDoController = require('./controllers/toDo.controller');
const jwtMiddleware = require('../../middlewares/jwt.middleware');

router.get('/', jwtMiddleware, toDoController.getAll);
router.post('/', jwtMiddleware, toDoController.post);
router.get('/:id', jwtMiddleware, toDoController.getOne);
router.put('/:id', jwtMiddleware, toDoController.update);
router.delete('/:id', jwtMiddleware, toDoController.delete);

module.exports = router;



