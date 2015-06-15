
var Reflux 	= require('reflux');
var Actions = require('../actions/actions.js');
var _ 			= require('lodash');

// Construction for what data to return as SearchStore state.
var _data = {};

module.exports = Reflux.createStore({
	 listenables: Actions,

	 getInitialState: function() {
			return _data;
	 },

	 routeLoadingDone: function(State) {
			console.log("routeLoadCompleted");
			_data = State;
			Actions.routeLoad.completed();
			Actions.routeLoadDone();
			this.updateApp();
	 },

	 onRouteLoad: function(State) {
			console.log("RouteLoad: Start");

			// Nodes
			if(_.last(State.routes)) {
				 Actions.getDataRoute.triggerPromise("node", State).then(function() {
						console.log("onRouteLoad: Node loading complete");

						this.routeLoadingDone(State);
				 }.bind(this));
			} else {
				 this.routeLoadingDone(State);
			}


	 },

	 updateApp: function() {
			this.trigger(_data);
	 }

});
