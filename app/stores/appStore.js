
var Reflux 	= require('reflux');
var Actions = require('../actions/actions.js');
var _ 			= require('lodash');

var _HeaderBottomRightWidgets = {};

// Used for ".page-wrapper"
var _classes = {
	 "openWidget": "",
	 "fullScreenOpen": false,
	 "routeLoading": false
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
	 onRouteLoad: function() {
			_classes.routeLoading = true;
			this.updateApp();
	 },

	 onRouteLoadDone: function() {
			_classes.routeLoading = false;
			this.updateApp();
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
			this.trigger(_data);
	 }

});

