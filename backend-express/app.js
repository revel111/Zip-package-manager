const express = require('express');
const logger = require('morgan');
const cors = require("cors");
const corsOptions = {
    origin: ["http://localhost:5173"],
}

const app = express();

app.use(cors(corsOptions));
app.use(logger('dev'));
// app.use(express.json());

module.exports = app;
