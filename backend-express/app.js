const express = require('express');
const logger = require('morgan');
const cors = require("cors");

const indexRouter = require('./routes/indexRouter');
const userRouter = require('./routes/userRouter');
const zipRouter = require('./routes/zipRouter');
const typeRouter = require('./routes/typeRouter');
const {errorHandler} = require("./handlers/errorHandler");

const app = express();

const corsOptions = {
    origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());

const apiRouter = express.Router();

apiRouter.use('/', indexRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/zips', zipRouter);
apiRouter.use('/zipTypes', typeRouter);

app.use('/api', apiRouter);
app.use(errorHandler);

module.exports = app;
