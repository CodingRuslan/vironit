const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const con = require('./db');

const indexRouter = require('./routes/index');
const newOrderRouter = require('./routes/newOrder');
const clientsRouter = require('./routes/clientsRouter');
const cookRouter = require('./routes/cookRouter');
const orderRouter = require('./routes/ordersRouter');
const ingredientRouter = require('./routes/ingredientRouter');
const registrationRouter = require('./routes/registrationRouter');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/registration', registrationRouter);

app.use('/neworder', newOrderRouter);
app.use('/clients', clientsRouter);
app.use('/cooks', cookRouter);
app.use('/orders', orderRouter);
app.use('/ingredients', ingredientRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
