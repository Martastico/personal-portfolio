
var Reflux 	= require('reflux');
var Actions = require('../actions/actions.js');
var _ 			= require('lodash');
var Config 	= require('../app.config');

var _HeaderBottomRightWidgets = {};

// Used for ".page-wrapper"
var _classes = {
	"openWidget": "",
	"fullScreenOpen": false,
	"routeLoading": true,
	"isMobile": false,
	"page": "",
	"sidebar": false
};

// Construction for what data to return as AppStore state.
var _data = {
	classes: _classes
};

module.exports = Reflux.createStore({
	listenables: Actions,

	getInitialState: function() {
		return _data;
	},

	// Todo: Combine with onRouteLoadDone
	onRouteLoad: function(State) {
		console.log("onRouteLoad");
		_classes.sidebar = State.path.replace(/^\/([^\/]*).*$/, '$1') === "portfolio";
		_classes.page = !_.isEmpty(State.path) ? _.trim((State.path).replace(/\//g, ' ')) : "home";
		_classes.routeLoading = true;
		this.updateApp();
	},

	onRouteLoadDone: function(State) {
		_classes.routeLoading = !Config.isBrowser; // Without it, there will be react error saying client and server html is different hence reducing performance
		console.log("onRouteLoadDone");
		if(State.path.replace(/^\/([^\/]*).*$/, '$1') === "portfolio") {
			_classes.sidebar = true;
		} else {
			_classes.sidebar = false;
		}
		this.updateApp();
	},

	onIsMobile: function(value) {
		if(_classes.isMobile !== value) {
			_classes.isMobile = value;
			this.updateApp();
		}
	},

	onSiderbarToggle: function(toggle) {
		// toggle:
		// true (open)
		// false (close)

		console.log("onSiderbarToggle");
	},

	onWidgetOpen: function(widget) {
		// Only one widget may be open.
		widget = widget + "-open open";

		// If same widget is already open the "close" it
		if(_classes.openWidget === widget)
			widget = "";

		_classes.openWidget = widget;

		this.updateApp();

	},

	onFullScreen: function() {
		_classes.fullScreenOpen = !_classes.fullScreenOpen;
		var fullScreenTranslate = _classes.fullScreenOpen ? "Fullscreen" : "Not Fullscreen";

		ga('send', 'event', 'Header Widgets', 'Changed Fullscreen Option', fullScreenTranslate);
		this.updateApp();
	},

	updateApp: function() {
		this.trigger(_.cloneDeep(_data));
	}

});

