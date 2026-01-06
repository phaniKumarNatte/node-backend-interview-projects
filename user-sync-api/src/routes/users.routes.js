const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
router.get('/saveUsers',usersController.syncPosts);
router.get('/getUsers',usersController.getUsers)
module.exports = router;