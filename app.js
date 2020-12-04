var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIrouter=require('./routes/testAPI');
var mongoose=require('mongoose');
var auth=require('./routes/auth');
var election=require('./routes/election');
var bodyparser=require('body-parser')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/testAPI',testAPIrouter);
app.use('/',auth);
app.use('/', election);

//mongoDB configuration;

const db=require('./Setup/mongourl').mongoURL;

mongoose.connect(db)
  .then(()=>console.log('MongoDB connected!!'))
    .catch(err=>console.log(err));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());


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
