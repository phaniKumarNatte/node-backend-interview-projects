const express = require('express');
const app = express();
app.use(express.json());
const userRouter = require('./routes/users.routes');
app.use('/api',userRouter);
app.listen(process.env.PORT, () => console.log('Server running on port',process.env.PORT));
