const db = require('../config/db');

exports.insertData = async (postData) => {
    const query = 'INSERT INTO posts (title, content) VALUES (?, ?)';
    const [result] = await db.execute(query, [postData.title, postData.content]);
    return result;
};

exports.getRecords = async (id) => {
    let query = 'SELECT * FROM posts WHERE is_deleted = 0';
    const values = [];
    if (id) {
        query += ' AND id = ?';
        values.push(id);
    }
    const [rows] = await db.execute(query, values);
    return rows;
};

exports.updateRecords = async (queryData) => {
    const { id, title, content } = queryData;
    const fields = [];
    const values = [];

    if (title) {
        fields.push('title = ?');
        values.push(title);
    }
    if (content) {
        fields.push('content = ?');
        values.push(content);
    }

    if (fields.length === 0) return; // nothing to update

    values.push(id);
    const query = `UPDATE posts SET ${fields.join(', ')} WHERE id = ?`;
    await db.execute(query, values);
};

exports.softDeleteRecords = async (id) => {
    const [result] = await db.execute('UPDATE posts SET is_deleted = ? WHERE id = ?', [1, id]);
    return result;
};

exports.restoreRecords = async (id) => {
    const [result] = await db.execute('UPDATE posts SET is_deleted = ? WHERE id = ?', [0, id]);
    return result;
};



