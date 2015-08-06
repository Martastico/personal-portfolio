
var Reflux 	= require('reflux');
var Actions = require('../actions/actions.js');
var _ 		= require('lodash');
var request = require('superagent');
var Async   = require('async');

var Config 	= require('../app.config');

// Construction for what data to return as SearchStore state.
var _data = {
	state: {},
	status: 0,
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
		var asyncStartTime = Date.now();
		Async.parallel([

				// Get Main Menu Links
				function(callback) {
					//console.log("### routeStore (54) PARALLEL: request.get(Config.path.api + '/menu/main')");

					var menuStartTime = Date.now();
					// If menu exists for client no need to refetch, on the other hand server will always check for update.
					if(_.isEmpty(_data.menu.main) || !Config.isBrowser) {
						console.log("Main Menu: " + Config.path.api + '/menu/main');
						request.get(Config.path.api + '/menu/main')
							.set('Accept', 'application/json')
							.end(function(err, res) {
								//console.log("Getting main menu from: " + Config.path.api + '/menu/main --- SUCCESS');

								if(!Config.isBrowser && _.isUndefined(res.body)) {
									callback(null, 0);
								}
								_data.menu.main = _.map(res.body, function (m, mk) {
									m.path = m.path === "/home" ? "" : m.path;
									return m;
								});

								console.log("menuStartTime request time: " + (Date.now() - menuStartTime));
								callback(null, 1);
							});
					} else {
						//console.log("Already have main menu --- showing cached menu");
						callback(null, 1);
					}
				},

				// Get current route Page (Node)
				function(callback) {
					var getDataRouteStart = Date.now();
					Actions.getDataRoute.triggerPromise("node", State)
						.then(function(res) {
							//console.log("STATTTUSS");
							console.log("getDataRouteStart request time: " + (Date.now() - getDataRouteStart));
							if(res.status === 200) {
								callback(null, 200);
							} else {
								callback(null, 404);
							}
						});
				},
				function(callback) {
					_data.state = State;
					callback(null, 1);
				}
			],
			function(err, res) {
				console.log("Async request time: " + (Date.now() - asyncStartTime));
				if(!res[0] === 0) {
					Actions.routeLoad.completed({state: "critical_error", status: status});
				} else {
					this.updateApp(res[1]);
				}

			}.bind(this)
		)

	},

	updateApp: function(status) {
		var triggerData = _.cloneDeep(_data);
		this.trigger(triggerData);

		Actions.routeLoad.completed({state: "success", status: status});
		Actions.routeLoadDone(triggerData.state);
	}

});
