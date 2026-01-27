const express = require('express');
const router = express.Router();
const controller = require('../controllers/taskController');


router.post('/tasks', controller.createTask);
router.get('/tasks', controller.getTasks);
router.patch('/tasks/:id/complete', controller.completeTask);


module.exports = router;