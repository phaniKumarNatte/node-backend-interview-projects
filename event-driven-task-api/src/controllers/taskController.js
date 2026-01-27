const taskService = require('../services/taskService');
const Task = require('../models/taskModel');

exports.createTask = async (req, res) => {
const task = await taskService.createTask(req.body);
res.status(201).json(task);
};

exports.getTasks = async (req, res) => {
const [tasks] = await Task.getAllTasks();
res.json(tasks);
};

exports.completeTask = async (req, res) => {
const task = await taskService.completeTask(req.params.id);
res.json(task);
};