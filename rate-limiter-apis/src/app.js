const express = require('express');
const app = express();
const limiter = require('./middlewares/ratelimiter');
const usersRoute = require('./routes/users.route');
app.use(limiter);
app.use(express.json());
app.use('/api',usersRoute);
app.listen(4000,() => {console.log('port running on 4000')});