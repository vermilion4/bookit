var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var session = require('express-session');

var indexRouter = require('./routes/index');

var app = express();

//connect to db
db = 'mongodb://127.0.0.1:27017/bookit'

mongoose.connect(db, {useNewUrlParser:true, useUnifiedTopology:true})
    .then(() => console.log('Mongodb connected...'))
    .catch((err) => console.log(err))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//express session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

//connect flash
app.use(flash());

//global vars
app.use((req,res,next)=>{
  res.locals.success_msg = req.flash('success_msg');
  next();
})

app.use('/', indexRouter);



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
