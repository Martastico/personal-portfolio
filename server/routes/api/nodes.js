var express 	= require('express');
var router 		= express.Router();
var path 			= require("path");
var _ 				= require("lodash");
var mongoose 	= require('mongoose');


var _testBody = "";
var randomIDCounter = 999;

// Todo: replace with mongodb
var nodes = [
	 {
			NID: 1,
			date: 12,
			nodeType: 1,
			title: "I create stuff that makes you look good",
			showTitle: true,
			body: _testBody,
			path: 'home',
			style: {
				 name: "index"
			}
	 },
	 {
			NID: 2,
			nodeType: 1,
			title: "About (Placeholder)",
			showTitle: true,
			body: 'Placeholder',
			path: 'about'
	 },
	 {
			NID: 3,
			nodeType: 1,
			title: "Portfolio (Placeholder)",
			showTitle: true,
			body: 'Placeholder',
			path: 'portfolio'
	 },
	 {
			NID: 4,
			nodeType: 1,
			title: "Freebies (Placeholder)",
			showTitle: true,
			body: 'Placeholder',
			path: 'freebies'
	 },
	 {
			NID: 5,
			nodeType: 1,
			title: "Contact (Placeholder)",
			showTitle: true,
			body: 'Placeholder',
			path: 'contact'
	 }
];



router.get('/nodes', function(req, res, next) {
	 res.json(nodes)
});

router.get('/nodes/:path', function(req, res, next) {

	 var returnJSON = _.filter(nodes, function(en, enk) {
			return _.snakeCase(en.path) === _.snakeCase(req.params.path);
	 });

	 if(_.isEmpty(returnJSON)) {
			randomIDCounter++;
			res.status(404).json([
						 {
								NID: -1,
								nodeType: 1,
								title: "404 - Not Found | " + req.params.path,
								showTitle: true,
								body: "Page not found. It's possible the page has been removed.",
								path: req.params.path
						 }
					]
			)
	 } else {
			res.json(returnJSON)
	 }

});

module.exports = router;
