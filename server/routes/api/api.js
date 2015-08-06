var express 	= require('express');
var router 		= express.Router();
var path 			= require("path");
var _ 				= require("lodash");


// User Login
router.get('/login', function(req, res, next) {
	console.log("/login");
	res.json({user: "123"});
});

router.get('/auth', function(req, res, next) {
	console.log("/auth");
	res.end("auth");
});

module.exports = router;


