var express 	= require('express');
var app 		   = express.Router();
var _ 			= require("lodash");
var passport = require('passport');

//var passportDrupal  = require('passport-drupal');
//var dStrategy = passportDrupal.DrupalStrategy;

app.post('/login', passport.authenticate('drupal'), function(req, res, next) {
	console.log("/login");
	res.json({user: "123"});
});

module.exports = app;


