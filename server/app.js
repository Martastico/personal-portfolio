require('node-jsx').install();

var express       = require('express');
var path          = require('path');
var favicon       = require('serve-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var compression   = require('compression');
//var mongoose 	= require('mongoose');

var ReactRouter   = require('react-router');

var DefaultRoute 	= ReactRouter.DefaultRoute;
var Link 					= ReactRouter.Link;
var Route 				= ReactRouter.Route;
var RouteHandler 	= ReactRouter.RouteHandler;

//var url = require('url');

//var index = require('./routes/index');
var api = require('./routes/api/nodes');
var users = require('./routes/users');
var index = require('./routes/index');

//127.0.0.1:27017
//mongoose.connect('mongodb://127.0.0.1:27017');

var app = express();

// Use if no NGINX proxy
app.use(express.static(path.join(__dirname, '../client'), {maxAge: 604800000}));
app.use(express.static(path.join(__dirname, '../storage'), {maxAge: 604800000}));

//function wwwRedirect(req, res, next) {
//  console.log("wwwRedirect: " + req.headers.host);
//  if (req.headers.host.slice(0, 4) === 'www.') {
//    console.log("MUST REDIRECTERINO");
//    var newHost = req.headers.host.slice(4);
//    return res.redirect(301, req.protocol + '://' + newHost + req.originalUrl);
//  }
//  next();
//}

app.set('trust proxy', true);
//app.use(wwwRedirect);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(express.static(path.join(__dirname, '../client/favicon.ico'))));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());


app.use('/api', api);
app.use('/users', users);

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
//
//app.use(express.static(__dirname + '/client'));
//app.use('/bower_components',  express.static(__dirname + '/bower_components'));


module.exports = app;
