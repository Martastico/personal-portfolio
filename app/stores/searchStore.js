
var Reflux 	= require('reflux');
var Actions = require('../actions/actions.js');
var _ 			= require('lodash');

var request 		= require('superagent');

var Config = require('../app.config');

// Construction for what data to return as SearchStore state.
var _data = {
	 searchValue: 	"", // User search keywords
	 searching: 		false, // True if fetching search results from server
	 hasResults: 		false, // True if results shown
	 searched:			false, // True if search value is not empty
	 searchResults: []
};

module.exports = Reflux.createStore({
	 listenables: Actions,

	 getInitialState: function() {
			return _data;
	 },

	 setSearchValue: function(searchValue) {
			_data.searchValue = searchValue;

			request.get(Config.path.api + '/page/search/'+searchValue).end(function(err, res) {
				 this.searchResults(res.body);
			}.bind(this));
	 },

	 searchResults: function(searchResults) {
			_data.searchResults = _.filter(searchResults, function(sr, srk) {
				 return !_.isEmpty(_data.searchValue) && _.includes(sr.title.toLowerCase(), _data.searchValue.toLowerCase());
			});

			if(!_.isEmpty(_data.searchResults)) {
				 ga('send', 'event', 'Header Widgets', 'Searched (Found)', _data.searchValue);
			} else {
				 ga('send', 'event', 'Header Widgets', 'Searched (Not Found)', _data.searchValue);
			}

			// Fake Loading Time

				 _data.hasResults = !_.isEmpty(_data.searchResults);
				 _data.searched 	= !_.isEmpty(_data.searchValue);

				 _data.searching = false;

				 this.updateApp();
	 },

	 onMainSearch: function(searchValue) {
			_data.searching = true;
			this.updateApp();
			this.setSearchValue(searchValue);
	 },

	 updateApp: function() {
			this.trigger(_data);
	 }

});

