
var Reflux 			= require('reflux');
var Actions 		= require('../actions/actions.js');
var _ 					= require('lodash');
var request 		= require('superagent');

// Config
var Config 		= require('../app.config');



var _data = {
	portfolio: []
};


module.exports = Reflux.createStore({
	listenables: Actions,

	getInitialState: function() {
		return _data;
	},

	onGetPortfolioItems: function() {
		console.log("getting portfolio items");
		request.get(Config.path.api + '/portfolio/list')
			.set({'Accept': 'application/json'})
			.end(function(err, res) {
				console.log("portfolio/items");
				console.log(res);
				_data.portfolio = res.body;
				Actions.getPortfolioItems.completed();
			}.bind(this)
		);
	}



});
