var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//db:
var db = require('./config/db');

//routers:
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var viewsRouter = require('./routes/views');
var apiRouter = require('./routes/api');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/funkoshop/views', viewsRouter);
app.use('/api', apiRouter);

module.exports = app;
