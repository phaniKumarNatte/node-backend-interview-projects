const EventEmitter = require('events');


class TaskEmitter extends EventEmitter {}


const taskEmitter = new TaskEmitter();


// Listeners
taskEmitter.on('task.created', (task) => {
console.log(`📌 Task Created: ${task.title}`);
});


taskEmitter.on('task.completed', (task) => {
console.log(`✅ Task Completed: ${task.title}`);
});


taskEmitter.on('task.deleted', (taskId) => {
console.log(`🗑 Task Deleted: ID ${taskId}`);
});


module.exports = taskEmitter;