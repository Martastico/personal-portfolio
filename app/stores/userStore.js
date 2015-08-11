
var Reflux 	= require('reflux');
var Actions = require('../actions/actions.js');
var _ 		= require('lodash');
var request = require('superagent');
var Async   = require('async');

var Config 	= require('../app.config');


//
// Currently a placeholder for later implementation of user authendication
//

var _data = {
	users: {
		loggedUser: {}
	},
	login: {
		loading:          false, // True if login request sent and waiting for response...
		authendication:   true,
		user:             "",
		pass:             ""
	}
};


module.exports = Reflux.createStore({
	listenables: Actions,

	getInitialState: function() {
		return _data;
	},

	onResetLoginForm: function() {
		if(Config.dev) console.log("reset login form");
		_data.login.loading        = false;
		_data.login.authendication = true;
		_data.login.pass           = "";
	},

	validate: function(data) {
		if(Config.dev) console.log("userStore.js: validate");

		setTimeout(function() {
			_data.login.loading        = false;
			_data.login.authendication = false;
			this.updateApp();
		}.bind(this), 1000)
	},

	onUserLogin: function(data) {
		// data: { user:user, pass:pass }
		if(Config.dev) console.log("userStore.js: onUserLogin");
		_data.login.loading        = true;
		_data.login.authendication = true;
		this.updateApp();
		this.validate(data);
	},

	updateApp: function() {
		this.trigger(_.clone(_data));
	}


});
