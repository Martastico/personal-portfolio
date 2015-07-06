////"use strict";
////
//// NPM Modules
var React 		 		= require('react');
var Reflux 		 		= require('reflux');
var AppTemplate 	= require('./components/app.jsx');

//module.exports = 5;

//var Router 		 		= require('react-router');
//var $ 				 		= require('jquery');
//
////// jQuery Plugins
//require('malihu-custom-scrollbar-plugin')($);
//
////// Config
var Config 	= require('./app.config');
//
////// Components
//var Nodes 	= require('./components/node/nodes.jsx');
//var Node 		= require('./components/node/node.jsx');
//var MainNavi= require('./components/navigation/mainNavi.jsx');
//
//// Header Components
//var HeaderBottomRightWidgets = require('./components/header/bottomRightWidgets/widgets.jsx');
//
//// Actions
var Actions = require('./actions/actions');
//
//// Stores
//var RouteStore 	= require('./stores/routeStore');
//var NodesStore 	= require('./stores/nodeStore');
//
//// Routes
//var DefaultRoute 	= Router.DefaultRoute;
//var Link 					= Router.Link;
//var Route 				= Router.Route;
//var RouteHandler 	= Router.RouteHandler;
//
//// <App />
var App = React.createClass({


	 //componentDidMount: function() {
	 //
	 //	var mainColumnMiddleContent = React.findDOMNode(this.refs.mainColumnMiddleContent);
	 //
	 //	resizedw();
	 //
	 //	function resizedw() {
	 //		 console.log("Browser resized");
	 //		 if($(window).width() < 639) {
	 //				$(mainColumnMiddleContent).mCustomScrollbar("destroy")
	 //		 } else {
	 //				$(mainColumnMiddleContent).mCustomScrollbar({
	 //					 theme: "mcc",
	 //					 scrollInertia: 120,
	 //					 advanced:{ updateOnContentResize: true },
	 //					 mouseWheel:{ scrollAmount: 120 }
	 //				});
	 //		 }
	 //	}
	 //
	 //	var doit;
	 //	window.onresize = function(){
	 //		 clearTimeout(doit);
	 //		 doit = setTimeout(resizedw, 200);
	 //	};
	 //
	 //
	 //},
	 //
	 //componentWillUpdate: function() {
	 //	var mainColumnMiddleContent = React.findDOMNode(this.refs.mainColumnMiddleContent);
	 //	if(this.state.AppStore.classes.routeLoading) {
	 //		 setTimeout(function() {
	 //				$(mainColumnMiddleContent).mCustomScrollbar("scrollTo", [0, null]);
	 //		 }, 50);
	 //	}
	 //},

	 render: function() {

			//console.log("%cApp Rendered");

			//return (
			//		<div className={classnames(pageWrapperClasses)}>
			//			 <img id="image-background" style={{backgroundImage: 'url(image/bigbg_1.jpg)'}} alt="Saarman Background"/>
			//			 <section id="page">
			//					<div className="content">
			//						 <header id="header">
			//								<div className="top">
			//									 <div className="left">
			//											<div className="logo">
			//												 <Link to="node" params={{path: "home"}} className="home"></Link>
			//											</div>
			//									 </div>
			//									 <div className="right">
			//											<button id="fullscreen" onClick={Actions.fullScreen}><span>Full Screen App</span></button>
			//									 </div>
			//								</div>
			//								<div className="bottom">
			//									 <div className="left">
			//											<span>Web Designer &amp; Developer in Finland</span>
			//									 </div>
			//									 <div className={classnames(HeaderBottomRightWidgetsClasses)}>
			//											<HeaderBottomRightWidgets openWidget={HeaderBottomRightWidgetsClasses[1]}/>
			//									 </div>
			//								</div>
			//						 </header>
			//						 <div className="main-content-wrapper">
			//								<section id="main_content">
			//									 <section id="main_column_left">
			//											<div id="main_column_left_widgets">
			//												 <div className="content">
			//														<div id="main_column_left_navi" className="widget-1 widget widget-wrapper">
			//															 <MainNavi />
			//														</div>
			//												 </div>
			//											</div>
			//											<footer>
			//												 <div className="bottom">
			//														<div className="country left">
			//															 <h3 className="country">Finland</h3>
			//														</div>
			//												 </div>
			//											</footer>
			//									 </section>
			//									 <section id="main_column_middle">
			//											<div className="content" ref="mainColumnMiddleContent">
			//												 <Helmet
			//														 titleTemplate = {Config.titleTemplate}
			//														 meta={[
			//																 {"name": "description", "content": ""},
			//																 {"property": "og:type", "content": "article"}
			//														 ]}
			//														 />
			//												 <RouteHandler/>
			//
			//											</div>
			//											<div className="loading">
			//												 <span>loading</span>
			//											</div>
			//									 </section>
			//								</section>
			//						 </div>
			//					</div>
			//			 </section>
			//		</div>
			//)

			//return(
			//		<html>
			//		<head lang="en">
			//			 <meta charset="UTF-8" />
			//			 <meta name="viewport" content="width=device-width, initial-scale=1.0" />
			//			 <link rel="stylesheet" href="css/app.css"/>
			//			 <title>Mart Saarman | Front-End Web Developer and Designer, including Javascript</title>
			//		</head>
			//		<body>
			//
			//		<section id="app">
			//			 <AppTemplate />
			//		</section>
			//		</body>
			//		</html>
			//);
			return (<div>ROFL</div>)
	 }

});
//
//var DefaultRouterRedirect = React.createClass({
//	 statics: {
//			willTransitionTo: function (transition, params) {
//				 transition.redirect(Config.path.relative + "/home");
//			}
//	 },
//	 render: function() { return null; }
//});
//
//var routes = (
//		<Route name="app" path={Config.path.relative} handler={App}>
//			 <Route name="nodes" handler={Nodes}>
//					<Route name="node" path={Config.path.relative + "/:path"} handler={Node}/>
//					<DefaultRouterRedirect path={Config.path.relative + "/"} handler={DefaultRouterRedirect}/>
//			 </Route>
//		</Route>
//);
//
////Router.run(routes, Router.HistoryLocation, function (Handler) { // Remove Hash index/#/ > index/
//Router.run(routes, Router.HistoryLocation, function (Handler, State) {
//	 Actions.routeLoad.triggerPromise(State).then(function() {
//			React.render(<Handler />, document.getElementById('app'));
//			console.log("Route changed");
//			ga('send', 'pageview', State.path);
//	 }).catch(function(err) {
//			console.log(err);
//	 })
//});

//if(window) {
//	 Router.run(routes, Router.HistoryLocation, (Handler) => {
//			React.render(<Handler path={window.location.pathname} />, document);
//	 });
//}