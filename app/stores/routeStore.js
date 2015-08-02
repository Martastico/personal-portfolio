
var Reflux 	= require('reflux');
var Actions = require('../actions/actions.js');
var _ 			= require('lodash');


var request 		= require('superagent');

var Config 		= require('../app.config');

var Async = require('async');


// Construction for what data to return as SearchStore state.
var _data = {
	 state: {},
	 menu: {
			main: {}
	 }
};
var _menu = {};

module.exports = Reflux.createStore({
	 listenables: Actions,

	 getInitialState: function() {
			return _data;
	 },

	 onRouteLoad: function(State) {
			console.log("RouteLoad: Start");

			Async.parallel([

						 // Get Main Menu Links
						 function(callback) {
								console.log("### routeStore (54) PARALLEL: request.get(Config.path.api + '/menu/main')");

								var mainMenu = request.get(Config.path.api + '/menu/main').end(function(err, res) {
									 console.log("Getting main menu from: " + Config.path.api + '/menu/main --- SUCCESS');

									 _data.menu.main = _.map(res.body, function (m, mk) {
											m.path = m.path === "/home" ? "" : m.path;
											return m;
									 });

									 callback(null, 1);
								});
						 },

						 // Get current route Page (Node)
						 function(callback) {
								console.log("### routeStore (70) PARALLEL: Actions.getDataRoute.triggerPromise");

								Actions.getDataRoute.triggerPromise("node", State)
										.then(function() {
											 callback(null, 1);
										});
						 },
							function(callback) {
								 console.log("### routeStore (61) PARALLEL: _data.state = State");
								 _data.state = State;
								 callback(null, 1);
							}
					],
					function(err, res) {
						 console.log("### routeStore (78) PARALLEL DONE: this.routeLoadingDone(State)");

						 this.updateApp();
					}.bind(this)
			)

	 },

	 updateApp: function() {
			console.log("updateApp: routeStore.js 68");
			var triggerData = _.cloneDeep(_data);
			this.trigger(triggerData);

			Actions.routeLoad.completed(true);
			Actions.routeLoadDone(triggerData.state);
	 }

});
