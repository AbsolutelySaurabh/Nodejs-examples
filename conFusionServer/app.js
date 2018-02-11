var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
const dishRouter = require('./routes/dishRouter');
const leaderRouter = require('./routes/leaderRouter');
const promoRouter = require('./routes/promoRouter');

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect( url, {

	useMongoClient: true
});

connect.then(db => {
	console.log('Connected correclty to the server.');

}, (err) => {
	console.log(err);
});


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//below is te secret-key included
app.use(cookieParser('12345-67890-09876-54321'));

//We want to do AUTH right before the queries onf our data


function auth (req, res, next) {

  if(!req.signedCookies.user){
    console.log(req.headers);
    var authHeader = req.headers.authorization;
    if (!authHeader) {
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        next(err);
        return;
    }

    var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];
    if (user == 'admin' && pass == 'password') {
        next(); // authorized
    } else {
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');      
        err.status = 401;
        next(err);
    }
 }else{

  //this is the second-time, so take data saved from cookie
  if(req.signedCookies.user == 'admin'){
    //allow
    next();

  }else{
      var err = new Error('You are not authenticated!');
      err.status = 401;
      next(err);
  }
}
}

app.use(auth);


//this enables us to serve statc data from public folder.
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/dishes', dishRouter);
app.use('/leaders', leaderRouter);
app.use('/promos', promoRouter);

// app.use('/dishes/:dishId/comments', dishRouter);
// app.use('/dishes/:dishId', dishRouter);
// app.use('/dishes/:dishId/comments/:commentId', dishRouter);
// app.use('/leaders/:leaderId', leaderRouter);
// app.use('/promos/:promoId', promoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
