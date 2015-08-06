
var React = require('react/addons');
var Reflux = require('reflux');
var _ 				 		= require('lodash');
var classnames 		= require('classnames');
var $ 				 		= require('jquery');
var url						= require('url');

var Router = require('react-router');
var Route 				= Router.Route;
var RouteHandler 	= Router.RouteHandler;
var Link 					= Router.Link;
var DefaultRoute 	= Router.DefaultRoute;

var HeaderBottomRightWidgets = require('./components/header/bottomRightWidgets/widgets.jsx');

var Actions			= require('./actions/actions');
var Config			= require('./app.config');

//// Components
var MainNavi	= require('./components/navigation/mainNavi.jsx');

//// Stores
var RouteStore 	= require('./stores/routeStore');
var NodesStore 	= require('./stores/nodeStore');

var AppStore 		= require('./stores/appStore');

var Nodes 	= require('./components/node/nodes.jsx');
var Node 		= require('./components/node/node.jsx' );
var Page = require('./components/page/page.jsx');
var Home = React.createClass({
	render: function() {
		return (
			<Page />
		);
	}
});

var App = React.createClass({
	mixins: [
		Reflux.connect(AppStore,"AppStore"),
		Reflux.connect(RouteStore,"RouteStore")
	],

	// Detect touch device
	isTouchDevice: function() {
		return (('ontouchstart' in window)
		|| (navigator.MaxTouchPoints > 0)
		|| (navigator.msMaxTouchPoints > 0));
	},

	componentDidMount: function() {

		var mainColumnMiddleContent = React.findDOMNode(this.refs.mainColumnMiddleContent);

		// Loaded
		$(mainColumnMiddleContent).addClass("loaded");


		if (!this.isTouchDevice()) {

		}

		resizedw();

		function resizedw() {
			if($(window).width() < 639) {
				Actions.isMobile(true);
			} else {
				Actions.isMobile(false);
			}
		}

		var doit;
		window.onresize = function(){
			clearTimeout(doit);
			doit = setTimeout(resizedw, 200);
		};



	},

	componentWillUpdate: function() {
		if(this.state.AppStore.classes.routeLoading) {
			$("#main_column_middle > .content").scrollTop(0);
		}

	},

	render: function() {
		console.log("----- App.js Updated -----");
		var SApp = this.state.AppStore;
		//console.log( SApp.classes);
		// Default ".page-wrapper" Classes
		var pageWrapperClasses = [
			{
				"page-wrapper": true,
				"fullscreen-open": SApp.classes.fullScreenOpen,
				"routeLoading": SApp.classes.routeLoading,
				"isMobile": SApp.classes.isMobile,
				"sidebar-open": SApp.classes.sidebar
			},
			SApp.classes.page
		];

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
										<Link to="pages" params={{path: '', splat: ''}} className="home"></Link>
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
								<section id="main_column_sidebar">
									<div>hello</div>
								</section>
								<section id="main_column_left">
									<div id="main_column_left_widgets">
										<div className="content">
											<nav id="main_column_left_navi" className="widget-1 widget widget-wrapper">
												<MainNavi />
											</nav>
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
	}
});

if(Config.isBrowser) {

	var RRoutes = (
		<Route path="/" handler={App}>
			<DefaultRoute handler={Page} />
			<Route name="pages" path="/:path*" handler={Page} />
		</Route>
	);

	Router.run(RRoutes, Router.HistoryLocation, function(Handler, State) {
		//console.log("Client: Router.run");

		Actions.routeLoad.triggerPromise(State).then(function () {
			//console.log("CLIENT: Route changed");

			ga('send', 'pageview', window.location.pathname);
			React.render(<Handler path={window.location.pathname} />, document.getElementById('app'));
		})
	})
}

module.exports = App;
