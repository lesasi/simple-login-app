const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')

const userRouter = require('./routers/user');
require('./db/mongoose');

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());

// routers here
app.use(userRouter);

module.exports = app;