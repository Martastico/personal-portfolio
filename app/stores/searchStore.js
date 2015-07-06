
var Reflux 	= require('reflux');
var Actions = require('../actions/actions.js');
var _ 			= require('lodash');


// Construction for what data to return as SearchStore state.
var _data = {
	 searchValue: 	"", // User search keywords
	 searching: 		false, // True if fetching search results from server
	 hasResults: 		false, // True if results shown
	 searched:			false, // True if search value is not empty
	 searchResults: []
};

// TODO: Server-side
var _allSearchResults = [
	 {
			title: "Home",
			type: "node",
			NID: 1,
			path: "home"
	 },
	 {
			title: "About Myself",
			type: "node",
			NID: 2,
			path: "about"
	 },
	 {
			title: "Portfolio",
			type: "node",
			NID: 3,
			path: "portfolio"
	 },
	 {
			title: "Freebies",
			type: "node",
			NID: 4,
			path: "freebies"
	 },
	 {
			title: "Contact",
			type: "node",
			NID: 5,
			path: "contact"
	 }
];

module.exports = Reflux.createStore({
	 listenables: Actions,

	 getInitialState: function() {
			return _data;
	 },

	 setSearchValue: function(searchValue) {
			_data.searchValue = searchValue;
			this.searchResults();
	 },

	 searchResults: function() {
			_data.searchResults = _.filter(_allSearchResults, function(sr, srk) {
				 return !_.isEmpty(_data.searchValue) && _.includes(sr.title.toLowerCase(), _data.searchValue.toLowerCase());
			});

			if(!_.isEmpty(_data.searchResults)) {
				 //ga('send', 'event', 'Header Widgets', 'Searched (Found)', _data.searchValue);
			} else {
				 //ga('send', 'event', 'Header Widgets', 'Searched (Not Found)', _data.searchValue);
			}

			// Fake Loading Time
			setTimeout(function () {

				 _data.hasResults = !_.isEmpty(_data.searchResults);
				 _data.searched 	= !_.isEmpty(_data.searchValue);

				 _data.searching = false;

				 this.updateApp();
			}.bind(this), 200);
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

