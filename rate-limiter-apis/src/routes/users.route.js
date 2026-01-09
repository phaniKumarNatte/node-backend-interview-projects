const express = require('express');
const userRouter = express.Router();
const usersController = require('../controllers/users.controller');
userRouter.get('/',usersController.getUsers);

module.exports = userRouter;