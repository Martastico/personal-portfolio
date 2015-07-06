
var React = require('react/addons');
var Reflux = require('reflux');
var _ 				 		= require('lodash');
var classnames 		= require('classnames');
var Helmet 				= require('react-helmet');
var $ 				 		= require('jquery');

var Router = require('react-router');
var Route 				= Router.Route;
var RouteHandler 	= Router.RouteHandler;
var Link 					= Router.Link;

var AppRoutes = require('../routes.jsx');

var HeaderBottomRightWidgets = require('../components/header/bottomRightWidgets/widgets.jsx');

var Actions			= require('../actions/actions');
var Config			= require('../app.config');

//// Components
var MainNavi	= require('../components/navigation/mainNavi.jsx');

//// Stores
var RouteStore 	= require('../stores/routeStore');
var NodesStore 	= require('../stores/nodeStore');

var AppStore 		= require('../stores/appStore');

var Nodes 	= require('../components/node/nodes.jsx');
var Node 		= require('../components/node/node.jsx');

if(typeof window !== 'undefined') {
	 require('malihu-custom-scrollbar-plugin')($);
}

var App = React.createClass({
	 mixins: [Reflux.connect(AppStore,"AppStore")],

	 componentDidMount: function() {

			var mainColumnMiddleContent = React.findDOMNode(this.refs.mainColumnMiddleContent);
			$(mainColumnMiddleContent).addClass("loaded");
			resizedw();

			function resizedw() {
				 console.log("Browser resized");
				 if($(window).width() < 639) {
						$(mainColumnMiddleContent).mCustomScrollbar("destroy")
				 } else {
						$(mainColumnMiddleContent).mCustomScrollbar({
							 theme: "mcc",
							 scrollInertia: 120,
							 advanced:{ updateOnContentResize: true },
							 mouseWheel:{ scrollAmount: 120 }
						});
				 }
			}

			var doit;
			window.onresize = function(){
				 clearTimeout(doit);
				 doit = setTimeout(resizedw, 200);
			};


	 },

	 componentWillUpdate: function() {
			var mainColumnMiddleContent = React.findDOMNode(this.refs.mainColumnMiddleContent);
			if(this.state.AppStore.classes.routeLoading) {
				 setTimeout(function() {
						$(mainColumnMiddleContent).mCustomScrollbar("scrollTo", [0, null]);
				 }, 50);
			}
	 },

	 render: function() {

			console.log("App Rendered");

			var SApp = this.state.AppStore;

			// Default ".page-wrapper" Classes
			var pageWrapperClasses = {
				 "page-wrapper": true,
				 "fullscreen-open": SApp.classes.fullScreenOpen,
				 "routeLoading": SApp.classes.routeLoading
			};

			var HeaderBottomRightWidgetsClasses = ["right"];

			// AppStore classes
			HeaderBottomRightWidgetsClasses.push(SApp.classes.openWidget);

			return(

					<div className={classnames(pageWrapperClasses)}>
						 <img id="image-background" style={{backgroundImage: 'url(image/bigbg_1.jpg)'}} alt="Saarman Background"/>
						 <section id="page">
								<div className="content">
									 <header id="header">
											<div className="top">
												 <div className="left">
														<div className="logo">
															<Link to="node" params={{path: "home"}} className="home"></Link>
														</div>
												 </div>
												 <div className="right">
														<button id="fullscreen" onClick={Actions.fullScreen}><span>Full Screen App</span></button>
												 </div>
											</div>
											<div className="bottom">
												 <div className="left">
														<span>Web Designer &amp; Developer in Finland</span>
												 </div>
												 <div className={classnames(HeaderBottomRightWidgetsClasses)}>
														<HeaderBottomRightWidgets openWidget={HeaderBottomRightWidgetsClasses[1]}/>
												 </div>
											</div>
									 </header>
									 <div className="main-content-wrapper">
											<section id="main_content">
												 <section id="main_column_left">
														<div id="main_column_left_widgets">
															 <div className="content">
																	<div id="main_column_left_navi" className="widget-1 widget widget-wrapper">
																		 <MainNavi />
																	</div>
															 </div>
														</div>
														<footer>
															 <div className="bottom">
																	<div className="country left">
																		 <h3 className="country">Finland</h3>
																	</div>
															 </div>
														</footer>
												 </section>
												 <section id="main_column_middle">
														<div className="content" ref="mainColumnMiddleContent">
															 <RouteHandler/>
														</div>
														<div className="loading">
															 <span>loading</span>
														</div>
												 </section>
											</section>
									 </div>
								</div>
						 </section>
					</div>
			);

			//return (
			//		<div className={classnames(pageWrapperClasses)}>
			//			 <img id="image-background" style={{backgroundImage: 'url(image/bigbg_1.jpg)'}} alt="Saarman Background"/>
			//			 <section id="page">
			//					<div className="content">
			//						 <header id="header">
			//								<div className="top">
			//									 <div className="left">
			//											<div className="logo">
			//											</div>
			//									 </div>
			//									 <div className="right">
			//									 </div>
			//								</div>
			//								<div className="bottom">
			//									 <div className="left">
			//											<span>Web Designer &amp; Developer in Finland</span>
			//									 </div>
			//									 <div className={classnames(HeaderBottomRightWidgetsClasses)}>
			//									 </div>
			//								</div>
			//						 </header>
			//						 <div className="main-content-wrapper">
			//								<section id="main_content">
			//									 <section id="main_column_left">
			//											<div id="main_column_left_widgets">
			//												 <div className="content">
			//														<div id="main_column_left_navi" className="widget-1 widget widget-wrapper">
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
			//);



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

	 }
});

//var Test = React.createClass({
//	 render: function() {
//			return(<div>Works</div>)
//	 }
//});

//var DefaultRouterRedirect = React.createClass({
//	 statics: {
//			willTransitionTo: function (transition, params) {
//				 transition.redirect(Config.path.relative + "/home");
//			}
//	 },
//	 render: function() { return null; }
//});


if(typeof window !== 'undefined') {
	 console.log("HI");
	 var RRoutes = (
			 <Route name="app" path='' handler={App}>
					<Route name="nodes" handler={Nodes}>
						 <Route name="node" path="/:path" handler={Node}/>
					</Route>
			 </Route>
	 );

	 Router.run(RRoutes, Router.HistoryLocation, function(Handler, State) {

			Actions.routeLoad.triggerPromise(State).then(function () {
				 console.log("Route changed");
				 console.log(document);
				 React.render(<Handler path={window.location.pathname} />, document.getElementById('app'));
			})
	 })
}

module.exports = App;
