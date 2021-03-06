var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')

var indexRouter = require('./routes/index');
var customersRouter = require('./routes/customers');
var booksRouter = require('./routes/books')
var transactionsRouter = require('./routes/transactions')

var app = express();


// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/customers', customersRouter);
app.use('/books', booksRouter)
app.use('/transactions', transactionsRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


//Connect to mongodb
var db = mongoose.connection

mongoose.connect('mongodb://localhost:27017/library', {
  useNewUrlParser: true
})
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;











