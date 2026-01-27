const db = require('../config/db');


exports.createTask = (title, description) => {
return db.promise().query(
'INSERT INTO tasks (title, description) VALUES (?, ?)',
[title, description]
);
};


exports.getAllTasks = () => {
return db.promise().query('SELECT * FROM tasks');
};


exports.getTaskById = (id) => {
return db.promise().query('SELECT * FROM tasks WHERE id = ?', [id]);
};


exports.updateTask = (id, title, description) => {
return db.promise().query(
'UPDATE tasks SET title = ?, description = ? WHERE id = ?',
[title, description, id]
);
};


exports.deleteTask = (id) => {
return db.promise().query('DELETE FROM tasks WHERE id = ?', [id]);
};


exports.completeTask = (id) => {
return db.promise().query(
"UPDATE tasks SET status = 'completed' WHERE id = ?",
[id]
);
};