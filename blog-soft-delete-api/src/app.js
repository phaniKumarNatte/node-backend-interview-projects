const express = require('express');
require('dotenv').config();
const app = express();
const postRouter = require('./routes/posts.routes');

const PORT = process.env.PORT || process.env.port || 3000;

app.use(express.json());
app.use('/api', postRouter);

app.listen(PORT, () => console.log('running on port--', PORT));
