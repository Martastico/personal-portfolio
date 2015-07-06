var express = require('express');
var NodeRouter = express.Router();
var path = require("path");
var React = require('react/addons');
var Router = require('react-router');

var Route 				= Router.Route;

//var DefaultRoute 	= Router.DefaultRoute;
//var Link 					= Router.Link;
//var Route 				= Router.Route;
//var RouteHandler 	= Router.RouteHandler;

var Actions 	= require('../../app/actions/actions');

var Nodes 	= require('../../app/components/node/nodes.jsx');
var Node 		= require('../../app/components/node/node.jsx');

var App = require('../../app/components/app.jsx');

var Test = React.createClass({
  render: function() {
    console.log("test1");
    return(<div>Works</div>)
  }
});
var Test2 = React.createClass({
  render: function() {
    console.log("test2");
    return(<div>Works</div>)
  }
});

//var AppRoutes = (
//    <Route name="app" path='' handler={App}>
//      <Route name="node" path="/:path" handler={Test}></Route>
//<DefaultRouterRedirect path="/" handler={DefaultRouterRedirect}/>
//    </Route>
//);

var RRoutes = (
    <Route name="app" path='' handler={App}>
      <Route name="nodes" handler={Nodes}>
        <Route name="node" path="/:path" handler={Node}/>
      </Route>
    </Route>
);


NodeRouter.get('*', function(req, res, next) {
  //res.sendFile(path.join(__dirname+'/../../client/app.html'))
  var path = req.path === "/" ? "/home" : req.path;
  console.log(path);

  Router.run(RRoutes, path, function(Handler, State) {

    Actions.routeLoad.triggerPromise(State).then(function() {
      res.render("index", {app: React.renderToString(<Handler />)});
      console.log("Route changed");
      //ga('send', 'pageview', State.path);
    }).catch(function(err) {
      console.log(err);
    });

    //React.renderToString(<Handler />))
  });

});

module.exports = NodeRouter;
