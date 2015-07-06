
var React = require('react/addons');
var Router = require('react-router');


var DefaultRoute 	= Router.DefaultRoute;
var Route 				= Router.Route;

var Config			= require('./app.config');

//var Nodes 		= require('./components/node/nodes.jsx');
//var Node 			= require('./components/node/node.jsx');
var App 			= require('./components/app.jsx');


//var DefaultRouterRedirect = React.createClass({
//	 statics: {
//			willTransitionTo: function (transition, params) {
//				 transition.redirect(Config.path.relative + "/home");
//			}
//	 },
//	 render: function() { return null; }
//});
//
//
var Test = React.createClass({
	 render: function() {
			return(<div>Works</div>)
	 }
});

//module.exports = (
//		<Route name="app" path='' handler={App}>
//			 <Route name="nodes" handler={Nodes}>
//					<Route name="node" path="/:path" handler={Node}/>
//					<DefaultRouterRedirect path="/" handler={DefaultRouterRedirect}/>
//			 </Route>
//		</Route>
//);

//var AppRoutes = (
//		<Route name="app" path='' handler={App}>
//			 <Route name="node" path="/:path" handler={Test}></Route>
//		</Route>
//);

//module.exports = AppRoutes;

//if(typeof window !== 'undefined') {
//	 console.log("LOL");
//	 Router.run(AppRoutes, Router.HistoryLocation, function(Handler) {
//			React.render(<Handler path={window.location.pathname} />, document);
//	 });
//}
var RRoutes = (
		<Route name="app" path='' handler={App}>
			 <Route name="node" path="/:path" handler={Test} />
		</Route>
);

module.exports = RRoutes;