
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




module.exports = Reflux.createStore({
	listenables: Actions,

	getInitialState: function() {
		return _data;
	},

	// Get Main Menu Links
	routeLoadGetMenu: function(State, callback) {

		var menuStartTime = Date.now();
		_data.state = State;

		// If menu exists for client no need to refetch, on the other hand server will always check for update.
		if(_.isEmpty(_data.menu.main) || !Config.isBrowser) {
			console.log("Getting Main Menu: " + Config.path.api + '/menu/main');

			request.get(Config.path.api + '/menu/main')
				.set('Accept', 'application/json')
				.end(function(err, res) {
					console.log("Getting main menu from: " + Config.path.api + '/menu/main --- SUCCESS');

					if(!Config.isBrowser && _.isUndefined(res.body)) return callback(null, 0);

					_data.menu.main = _.map(res.body, function (m, mk) {
						m.path = m.path === "/home" ? "" : m.path;
						return m;
					});

					console.log("menuStartTime request time: " + (Date.now() - menuStartTime) + "ms");
					return callback(null, 1);
				});

		} else {
			//console.log("Already have main menu --- showing cached menu");
			return callback(null, 1);
		}
	},

	// Get current route Page (Node)
	routeLoadGetPage: function(State, callback)  {
		var getDataRouteStart = Date.now();

		Actions.getDataRoute.triggerPromise("node", State)
			.then(function(res) {
				console.log("Node request time: " + (Date.now() - getDataRouteStart) + "ms");
				if(res.status === 200) {
					return callback(null, 200);
				} else {
					return callback(null, 404);
				}
			});
	},

	routeLoadEnd: function(asyncStartTime, err, res) {
		console.log("Route loading async request time: " + (Date.now() - asyncStartTime) + "ms");
		if(!res[0] === 0) {
			Actions.routeLoad.completed({state: "critical_error", status: status});
		} else {
			this.updateApp(res[1]);
		}
	},

	onRouteLoad: function(State) {
		if(Config.dev) console.log("RouteLoad: Start");
		Async.parallel([
				// Get Main Menu Links
				_.partial(this.routeLoadGetMenu, State),

				// Get current route Page (Node)
				_.partial(this.routeLoadGetPage, State)
			],

			// End
			_.partial(this.routeLoadEnd, Date.now())
		)

	},

	updateApp: function(status) {
		var triggerData = _.cloneDeep(_data);
		this.trigger(triggerData);

		Actions.routeLoad.completed({state: "success", status: status});
		Actions.routeLoadDone(triggerData.state);
	}

});
