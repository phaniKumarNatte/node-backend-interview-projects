const express = require('express');
const app = express();
const userRoute = require('./routes/users.routes');

app.use(express.json());
app.use('/api',userRoute);
app.listen(3000,() => {console.log('port running on 3000')});