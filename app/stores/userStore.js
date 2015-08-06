
var Reflux 	= require('reflux');
var Actions = require('../actions/actions.js');
var _ 		= require('lodash');
var request = require('superagent');
var Async   = require('async');

var Config 	= require('../app.config');


var _data = {
	users: {
		loggedUser: {}
	},
	login: {
		loading: false, // True if login request sent and waiting for response...
		user:    "",
		pass:    ""
	}
};


module.exports = Reflux.createStore({
	listenables: Actions,

	getInitialState: function() {
		return _data;
	},

	validate: function(data) {
		console.log("userStore.js: validate");

		request.get('http://localhost.saarman.net/auth/drupal')
			.send({hello: 1})
			.end(function (err, res) {
			_data.login.loading = false;
			console.log(res.body);
			this.updateApp();
		}.bind(this));
	},

	onUserLogin: function(data) {
		// data: { user:user, pass:pass }
		console.log("userStore.js: onUserLogin");
		_data.login.loading = true;
		this.updateApp();
		this.validate(data);
	},

	updateApp: function() {
		this.trigger(_.clone(_data));
	}


});
