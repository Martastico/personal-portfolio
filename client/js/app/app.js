"use strict";

// NPM Modules
var React 		 		= require('react');
var Reflux 		 		= require('reflux');
var Router 		 		= require('react-router');
var DocumentTitle	= require('react-document-title');
var $ 				 		= require('jquery');
var _ 				 		= require('lodash');
var classnames 		= require('classnames');

// jQuery Plugins
require('malihu-custom-scrollbar-plugin')($);

// Components
var Nodes 	= require('./components/node/nodes.jsx');
var Node 		= require('./components/node/node.jsx');

// Header Components
var HeaderBottomRightWidgets = require('./components/header/bottomRightWidgets/widgets.jsx');

// Actions
var Actions = require('./actions/actions');

// Stores
var AppStore 		= require('./stores/appStore');
var RouteStore 	= require('./stores/routeStore');
var NodesStore 	= require('./stores/nodeStore');

// Routes
var DefaultRoute 	= Router.DefaultRoute;
var Link 					= Router.Link;
var Route 				= Router.Route;
var RouteHandler 	= Router.RouteHandler;

// <App />
var App = React.createClass({
	 mixins: [Reflux.connect(AppStore,"AppStore")],

	 componentDidMount: function() {

			var mainColumnMiddleContent = React.findDOMNode(this.refs.mainColumnMiddleContent);
			// M-CUSTOM-SCROLLBAR JQUERY LIBRARY
			// ref: mainColumnMiddleContent

			//$(React.findDOMNode(mainColumnMiddleContent)).mCustomScrollbar({
			//	 theme: "mcc",
			//	 scrollInertia: 160
			//});

			resizedw();

			function resizedw(){
				 if($(window).width() < 639) {
						$(mainColumnMiddleContent).mCustomScrollbar("destroy")
				 } else {
						$(mainColumnMiddleContent).mCustomScrollbar({
							 theme: "mcc",
							 scrollInertia: 160
						});
				 }
			}

			var doit;
			window.onresize = function(){
				 clearTimeout(doit);
				 doit = setTimeout(resizedw, 200);
			};

	 },

	 render: function() {

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


			return (
					<div className={classnames(pageWrapperClasses)}>
						 <img id="image-background" style={{backgroundImage: 'url(image/bigbg_1.jpg)'}} alt="Saarman Background"/>
						 <section id="page">
								<div className="content">
									 <header id="header">
											<div className="top">
												 <div className="left">
														<div className="logo">
															 <a href="#">
																	<img src="image/logo-dark.svg" alt="Mart Saarman"/>
															 </a>
														</div>
												 </div>
												 <div className="right">
														<button id="fullscreen" onClick={Actions.fullScreen}><span>Full Screen App</span></button>
												 </div>
											</div>
											<div className="bottom">
												 <div className="left">
														<span>Web Designer &amp; Developer</span>
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
																	<ul id="main_column_left_navi" className="widget-1 widget widget-wrapper">
																		 <li><Link to="node" params={{NID: 1}} className="home"><span>Home</span></Link></li>
																		 <li><Link to="node" params={{NID: 2}} className="about"><span>About Myself</span></Link></li>
																		 <li><Link to="node" params={{NID: 3}} className="portfolio"><span>Portfolio</span></Link></li>
																		 <li><Link to="node" params={{NID: 4}} className="freebies"><span>Freebies</span></Link></li>
																		 <li><Link to="node" params={{NID: 5}} className="contact"><span>Contact</span></Link></li>
																	</ul>
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

															 <DocumentTitle title='Mart Saarman'>
																	<RouteHandler/>
															 </DocumentTitle>

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
			)
	 }

});

var DefaultRouterRedirect = React.createClass({
	 statics: {
			willTransitionTo: function (transition, params) {
				 transition.redirect('/node/1');
			}
	 },
	 render: function() { return null; }
});

var routes = (
		<Route name="app" path="/" handler={App}>
			 <Route name="nodes" handler={Nodes}>
					<Route name="node" path="/node/:NID" handler={Node} />
			 </Route>
			 <DefaultRoute handler={DefaultRouterRedirect}/>
		</Route>
);

//Router.run(routes, Router.HistoryLocation, function (Handler) { // Remove Hash index/#/ > index/
Router.run(routes, function (Handler, State) {
	 Actions.routeLoad.triggerPromise(State).then(function() {
			React.render(<Handler/>, document.getElementById('app'));
	 }).catch(function(err) {
			console.log(err);
	 })
});

