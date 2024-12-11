const express = require('express');
const logger = require('morgan');
const cors = require("cors");
const corsOptions = {
    origin: ["http://localhost:5173"],
}

const indexRouter = require('./routes/indexRouter');
const userRouter = require('./routes/userRouter');

// const connection = require('./db')

const app = express();

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());

app.use('/', indexRouter);
app.use('/users', userRouter);

module.exports = app;
