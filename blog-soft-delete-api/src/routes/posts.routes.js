const express = require('express');
const route = express.Router();
const postController = require('../controllers/posts.controller');

// RESTful endpoints for posts
route.post('/posts', postController.createPost);
route.get('/posts', postController.viewPosts);
route.get('/posts/:id', postController.viewPostById);
route.put('/posts/:id', postController.updatePost);
route.delete('/posts/:id', postController.deletePost);
route.post('/posts/:id/restore', postController.restorePost);

module.exports = route;