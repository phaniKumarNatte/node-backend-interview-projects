const Task = require('../models/taskModel');
const taskEmitter = require('../events/taskEvents');


exports.createTask = async (data) => {
const { title, description } = data;
const [result] = await Task.createTask(title, description);


const task = { id: result.insertId, title, description };


taskEmitter.emit('task.created', task);
return task;
};


exports.completeTask = async (id) => {
await Task.completeTask(id);

const [rows] = await Task.getTaskById(id);
const task = rows[0];

taskEmitter.emit('task.completed', task);
return task;
};