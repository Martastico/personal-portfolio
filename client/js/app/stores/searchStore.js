
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

var _allSearchResults = [
	 {
			title: "Home",
			type: "node",
			NID: 1
	 },
	 {
			title: "About Myself",
			type: "node",
			NID: 2
	 },
	 {
			title: "Portfolio",
			type: "node",
			NID: 3
	 },
	 {
			title: "Freebies",
			type: "node",
			NID: 4
	 },
	 {
			title: "Contact",
			type: "node",
			NID: 5
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

			//console.log(_data.searchResults);

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

