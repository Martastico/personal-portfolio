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
//var Link 					= Router.Link;
//var Route 				= Router.Route;
//var RouteHandler 	= Router.RouteHandler;

var Config 	= require('../../app/app.config');
var Actions 	= require('../../app/actions/actions');

var Nodes 	= require('../../app/components/node/nodes.jsx');
var Node 		= require('../../app/components/node/node.jsx');
var Page 		= require('../../app/components/page/page.jsx');

var App = require('../../app/app');




var test = React.createClass({
   render: function() {
      return (<div>asd</div>)
   }
});

var test2 = React.createClass({
   render: function() {
      return (<div>asd</div>)
   }
});

var RRoutes = (
   <Route handler={App}>

      <DefaultRoute name="home" handler={Page} />

      <Route name="portfolio">
         <DefaultRoute handler={Page} />
         <Route name="portfolio.items" path=":page" handler={test} />
      </Route>

      <Route name="pages" path=":page" handler={Page} />


   </Route>
);


NodeRouter.get('*', function(req, res, next) {

   console.log(req);

   // User disconnect
   req.connection.addListener('close', function () {
      Actions.routeLoad.completed("fail");
   }.bind(this));

   console.log("PATHHHHHHH:");
   console.log(req.path);

   Router.run(RRoutes, req.path, function(Handler, State) {

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


               var reactRenderString = React.renderToString(<Handler />);
               head = Helmet.rewind();
               res.render("index", {APP: reactRenderString, head: head});
            } else if (response.state === "fail") {
               return res.end();
            }


         }).catch(function(err) {
            console.log(err);
         });

   });

});

module.exports = NodeRouter;
