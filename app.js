const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

const area = require('./api/area');
const category = require('./api/category');
const journal = require('./api/journal');
const issn = require('./api/issn');
const source = require('./api/source');
const evaluation = require('./api/evaluation');
const attribute = require('./api/attribute');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/area', area);
app.use('/api/v1/category', category);
app.use('/api/v1/journal', journal);
app.use('/api/v1/issn', issn);
app.use('/api/v1/source', source);
app.use('/api/v1/evaluation', evaluation);
app.use('/api/v1/attribute', attribute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
