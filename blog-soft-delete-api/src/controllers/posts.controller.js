const model = require('../models/posts.model');

exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) return res.status(400).send({message:'title and content are required'});
        const result = await model.insertData({ title, content });
        res.status(201).send({ message: 'Post created successfully', insertId: result.insertId });
    } catch (error) {
        console.error('createPost error:', error);
        res.status(500).send({message:'Internal server error'});
    }
};

exports.viewPosts = async (req, res) => {
    try {
        const rows = await model.getRecords();
        res.send(rows);
    } catch (error) {
        console.error('viewPosts error:', error);
        res.status(500).send('Internal server error');
    }
};

exports.viewPostById = async (req, res) => {
    try {
        const id = req.params.id;
        const rows = await model.getRecords(id);
        if (!rows || rows.length === 0) return res.status(404).send('Post not found');
        res.send(rows[0]);
    } catch (error) {
        console.error('viewPostById error:', error);
        res.status(500).send('Internal server error');
    }
};

exports.updatePost = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, content } = req.body;
        if (!id) return res.status(400).send('id is required');
        await model.updateRecords({ id, title, content });
        res.send('data updated successfully');
    } catch (error) {
        console.error('updatePost error:', error);
        res.status(500).send('Internal server error');
    }
};

exports.deletePost = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).send('id is required');
        await model.softDeleteRecords(id);
        res.send('Record soft-deleted successfully');
    } catch (error) {
        console.error('deletePost error:', error);
        res.status(500).send('Internal server error');
    }
};

exports.restorePost = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).send('id is required');
        await model.restoreRecords(id);
        res.send('Record restored successfully');
    } catch (error) {
        console.error('restorePost error:', error);
        res.status(500).send('Internal server error');
    }
};