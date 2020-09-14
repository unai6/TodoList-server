
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require("body-parser");

const app = express();

const projectRouter = require('./routes/todo-list');

app.set('port', process.env.PORT || 5000)

// connection mongo server

mongoose
    .connect(process.env.MONGODB_URI, {
        useUnifiedTopology: true,
        keepAlive: true,
        useNewUrlParser: true,
        useFindAndModify: false
    })
    .then(() => console.log(`Connected to todo-list-forines `))
    .catch((err) => console.error(err));

// cors setup

app.use(
    cors({
        credentials: true,
        origin: ["https://organise-forines.web.app", "https://organise-forines.firebaseapp.com/", "https://www.unaigo.com", "http://www.unaigo.com", "http://www.fontawesome.com", "http://localhost:3000"]
    })
);  

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use('/public',  express.static(path.join(__dirname, 'public')));


app.use('/', projectRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
  });

  module.exports = app