
var Reflux 	= require('reflux');
var Actions = require('../actions/actions.js');
var _ 			= require('lodash');

var _HeaderBottomRightWidgets = {};

// Used for ".page-wrapper"
var _classes = {
	 "openWidget": "",
	 "fullScreenOpen": false
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
			this.updateApp();
	 },

	 updateApp: function() {
			this.trigger(_data);
	 }

});

