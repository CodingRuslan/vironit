const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const con = require('./db');
const Cookies = require('cookies');
const COOKIES_KEY = ["This is cookies key"];

const indexRouter = require('./routes/index');
const newOrderRouter = require('./routes/newOrder');
const clientsRouter = require('./routes/clientsRouter');
const cookRouter = require('./routes/cookRouter');
const orderRouter = require('./routes/ordersRouter');
const ingredientRouter = require('./routes/ingredientRouter');
const registrationRouter = require('./routes/registrationRouter');
const loginRouter = require('./routes/loginRouter');
const logOutRouter = require('./routes/logOutRouter');

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
app.use('/login', loginRouter);
app.use('/logout', logOutRouter);

app.use(verifyAuthorization);

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

function getToken(req, res) {
  let cookies = new Cookies(req, res, {keys: COOKIES_KEY});
  return cookies.get('token', {signed: true});
}

function verifyAuthorization(req, res, next) {
  if (getToken(req, res)) next();
  else {
    res.redirect('/login')
  }
}

module.exports = app;
