var express = require('express');
var NodeRouter = express.Router();
var path = require("path");
var React = require('react/addons');
var Router = require('react-router');
var Helmet 				= require('react-helmet');
var request 		= require('superagent');
var Async 		= require('async');
var _ 			= require('lodash');

var Route 				= Router.Route;

var DefaultRoute 	= Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var Config 	= require('../../app/app.config');
var Actions 	= require('../../app/actions/actions');

var Nodes 	= require('../../app/components/node/nodes.jsx');
var Node 		= require('../../app/components/node/node.jsx');
var Page 		= require('../../app/components/page/page.jsx');


var RRoutes       = require('../../app/routes');

var App = require('../../app/components/app.jsx');


NodeRouter.get('*', function(req, res, next) {

   // User disconnect
   req.connection.addListener('close', function () {
      Actions.routeLoad.completed("fail");
   }.bind(this));

   Router.run(RRoutes, req.path, function(Handler, State) {
      console.log("#############");

      Actions.routeLoad.triggerPromise(State)
         .then(function(response) {
            // status:
            // "success"         Send Response
            // "fail"            Don't send response (User disconnect)
            // "page-not-found"

            console.log("Actions.routeLoad state: " + response.state);

            if(response.state === "success") {
               console.log("SERVER: Route changed");
               if(response.status === 404) res.status(404);

               Async.waterfall([
                  function(callback) {
                     callback(null, React.renderToString(<Handler />));
                  },
                  function(renderToString, callback) {
                     res.render("index", {APP: renderToString, head: Helmet.rewind()});
                     callback(null, true)
                  }
               ], function (err, result) {
                  console.log("App Rendered");
               });

               // Async render



            } else if (response.state === "fail") {
               return res.end();
            }


         }).catch(function(err) {
            console.log(err);
         });

   });

});

module.exports = NodeRouter;
