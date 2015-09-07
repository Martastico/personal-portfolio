// NPM
var React      = require('react/addons');
var Async      = require('async');

// Routes
var Router        = require('react-router');
var RRoutes       = require('./routes');

// Actions
var Actions			= require('./actions/actions');

// Config
var Config			= require('./app.config');


Router.run(RRoutes, Router.HistoryLocation, function(Handler, State) {
	console.log("#############");
	Actions.routeLoad.triggerPromise(State).then(function (res) {

		ga('send', 'pageview', window.location.pathname);

		// Async render
		Actions.renderApp(<Handler path={window.location.pathname} />);
	});
});