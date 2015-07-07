var express = require('express');
var NodeRouter = express.Router();
var path = require("path");
var React = require('react/addons');
var Router = require('react-router');
var Helmet 				= require('react-helmet');

var Route 				= Router.Route;

//var DefaultRoute 	= Router.DefaultRoute;
//var Link 					= Router.Link;
//var Route 				= Router.Route;
//var RouteHandler 	= Router.RouteHandler;

var Config 	= require('../../app/app.config');
var Actions 	= require('../../app/actions/actions');

var Nodes 	= require('../../app/components/node/nodes.jsx');
var Node 		= require('../../app/components/node/node.jsx');

var App = require('../../app/components/app.jsx');

var Home = React.createClass({
   render: function() {
      console.log("home");
      return (
          <Nodes />
      );
   }
});

var RRoutes = (
    <Route name="app" path="" handler={App}>
       <Route name="home" path="/" handler={Home}/>
       <Route name="nodes" handler={Nodes}>
          <Route name="node" path="/:path" handler={Node}/>
       </Route>
    </Route>
);

/*
 <Route name="nodes" handler={Nodes}>
 <Route name="node" path="/:path" handler={Node}>
 </Route>
 </Route>
 * */



NodeRouter.get('*', function(req, res, next) {
   //res.sendFile(path.join(__dirname+'/../../client/app.html'))

   //if(req.path === "/") {
   //  res.redirect('/home')
   //}

   Router.run(RRoutes, req.path, function(Handler, State) {

      Actions.routeLoad.triggerPromise(State).then(function() {
         var reactRenderString = React.renderToString(<Handler />);
         head = Helmet.rewind();
         res.render("index", {app: reactRenderString, head: head});

         console.log("Route changed");
         //ga('send', 'pageview', State.path);
      }).catch(function(err) {
         console.log(err);
      });

      //React.renderToString(<Handler />))
   });

});

module.exports = NodeRouter;
