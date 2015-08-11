var React      = require('react/addons');
var Reflux     = require('reflux');
var classnames = require('classnames');
var $          = require('jquery');

var Router        = require('react-router');
var RouteHandler  = Router.RouteHandler;
var Link 			= Router.Link;

//// Components
// App
var Header = require('./app/header.jsx');


var MainNavi	= require('./navigation/mainNavi.jsx');
var Sidebar    = require('./navigation/sidebar.jsx');

//// Stores
var AppStore 		= require('../stores/appStore');
var RouteStore 	= require('../stores/routeStore');

var Actions			= require('../actions/actions');




module.exports = React.createClass({
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
			$("#main_column_middle > .content > .scroll").scrollTop(0);
		}

	},

	render: function() {
		//console.log("----- App.js Updated -----");
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
				<img id="image-background" style={{backgroundImage: 'url(/image/bigbg_1.jpg)'}} alt="Saarman Background"/>
				<section id="page">
					<div className="content">
						<Header AppStore={this.state.AppStore} />
						<div className="main-content-wrapper">
							<section id="main_content">
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

								<Sidebar />
								<section id="main_column_middle">
									<div className="content" ref="mainColumnMiddleContent">
										<div id="main_scroll" className="scroll">
											<RouteHandler/>
										</div>
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