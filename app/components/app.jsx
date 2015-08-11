// NPM
var React      = require('react/addons');
var Reflux     = require('reflux');
var classnames = require('classnames');
var $          = require('jquery');

// Router
var Router        = require('react-router');
var RouteHandler  = Router.RouteHandler;
var Link 			= Router.Link;

// Components

var Header     = require('./app/header.jsx');
var MainColumnLeft     = require('./app/mainColumnLeft.jsx');
var MainColumnMiddle     = require('./app/mainColumnMiddle.jsx');
var Sidebar    = require('./navigation/sidebar.jsx');

// Stores
var AppStore 	= require('../stores/appStore');
var RouteStore = require('../stores/routeStore');

// Actions
var Actions		= require('../actions/actions');

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
		var resizing;

		// Fire every time browser is resized
		resizedw();

		function resizedw() {
			if($(window).width() < 639) {
				Actions.isMobile(true);
			} else {
				Actions.isMobile(false);
			}
		}

		// Window Resize
		window.onresize = function(){
			clearTimeout(resizing);
			resizing = setTimeout(resizedw, 200);
		};

	},

	componentWillUpdate: function() {
		// Without this the scrollbar wont move to top when route changed.
		if(this.state.AppStore.classes.routeLoading) {
			$("#main_column_middle > .content > .scroll").scrollTop(0);
		}

	},

	render: function() {
		var SApp = this.state.AppStore;

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
								<MainColumnLeft />
								<Sidebar />
								<MainColumnMiddle AppStore={this.state.AppStore}/>
							</section>
						</div>
					</div>
				</section>
			</div>
		);
	}
});