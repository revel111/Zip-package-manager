const express = require('express');
const logger = require('morgan');
const cors = require("cors");
const corsOptions = {
    origin: ["http://localhost:5173"],
}

const indexRouter = require('./routes/indexRouter');
const userRouter = require('./routes/userRouter');
const zipRouter = require('./routes/zipRouter');
const zipTypeRouter = require('./routes/zipTypeRouter');

// const connection = require('./db')

const app = express();

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());

const apiRouter = express.Router();

apiRouter.use('/', indexRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/zips', zipRouter);
apiRouter.use('/zips', zipTypeRouter);

app.use('api', apiRouter);

module.exports = app;
