var express = require('express');
var router = express.Router();
var path = require("path");
var React = require('react/addons');
var Router = require('react-router');



//var App = React.createFactory(require('../../app/

//var App = require('./reactRoutes');

var App = require('../../app/components/app.jsx');

router.get('*', function(req, res, next) {
	 console.log("/test.js");
	 var path = req.path === "/" ? "/home" : req.path;
	 console.log(path);

	 Router.run(require('../../app/routes.jsx'), path, function(Handler) {
			res.send("<!DOCTYPE html>" + React.renderToString(<Handler />));
	 });
});
console.log("hi 2");

module.exports = router;
