var express = require('express');
var NodeRouter = express.Router();
var path = require("path");
var React = require('react/addons');
var Router = require('react-router');
var Helmet 				= require('react-helmet');
var request 		= require('superagent');
var Async 		= require('async');

var Route 				= Router.Route;

var DefaultRoute 	= Router.DefaultRoute;
//var Link 					= Router.Link;
//var Route 				= Router.Route;
//var RouteHandler 	= Router.RouteHandler;

var Config 	= require('../../app/app.config');
var Actions 	= require('../../app/actions/actions');

var Nodes 	= require('../../app/components/node/nodes.jsx');
var Node 		= require('../../app/components/node/node.jsx');
var Page 		= require('../../app/components/page/page.jsx');

var App = require('../../app/app');

var RRoutes = (
    <Route path="/" handler={App}>
       <DefaultRoute handler={Page} />
       <Route name="pages" path="/:path" handler={Page} />
    </Route>
);


NodeRouter.get('*', function(req, res, next) {
   // User disconnect
   req.connection.addListener('close', function () {
      Actions.routeLoad.completed(false);
   }.bind(this));

   Router.run(RRoutes, req.path, function(Handler, State) {
      console.log(req.path);


      Actions.routeLoad.triggerPromise(State)
          .then(function(status) {
             // status:
             // true     Send Response
             // false    Don't send response (User disconnect)

             console.log("Actions.routeLoad status: " + status);

             if(status) {
                console.log("SERVER: Route changed");
                console.log(status);

                var reactRenderString = React.renderToString(<Handler />);
                head = Helmet.rewind();
                res.render("index", {APP: reactRenderString, head: head});
             } else {
                return res.end();
             }


          }).catch(function(err) {
             console.log(err);
          });

   });

});

module.exports = NodeRouter;
