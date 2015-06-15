"use strict";

// NPM Modules
var React				= require('react');
var Reflux			= require('reflux');
var _ 					= require('lodash');
var classnames 	= require('classnames');

// Actions
var Actions			= require('../../../actions/actions');

// Config
var Config 	= require('../../../app.config');

// Stores
var SearchStore	= require('../../../stores/searchStore');

// Routes
var Router 		 		= require('react-router');
var Route 				= Router.Route;
var Link 					= Router.Link;

module.exports = React.createClass({
	 mixins: [
			require('react-onclickoutside'),
			Reflux.connect(SearchStore,"SearchStore")
	 ],

	 // If clicked outside the search wrapper, close it.
	 handleClickOutside: function(evt) {
			Actions.widgetOpen("search");
	 },

	 handleSearchChange: function(e) {
			if(e.target.value.slice(-1) !== "\n") {
				 this.setState({searchValue: e.target.value})
			}
	 },

	 handleSearchKeyDown: function(e) {
			if (e.keyCode === 13 || e.target.className === "submit-search") {
				 return this.submitSearch();
			}
			if(e.keyCode === 27) {
				 Actions.widgetOpen("search");
			}
	 },

	 // Send search request
	 submitSearch: function() {
			var SStore = this.state.SearchStore;
			var searchValue = this.state.searchValue;

			if(SStore.searching) {
				 console.log("already searching")
			} else {
				 Actions.mainSearch(searchValue);
			}

	 },

	 componentWillMount: function() {
			if(!_.isEmpty(this.state.SearchStore.searchValue)) {
				 this.setState({searchValue: this.state.SearchStore.searchValue})
			}
	 },

	 componentDidMount: function() {
			this.refs.submitSearch.getDOMNode().focus();
	 },


	 render: function() {
			var SStore = this.state.SearchStore;

			var resultClasses = {
				 "search-widget": true,		// Default class
				 "wrapper": 			true,
				 "searching":			SStore.searching,	// Searching
				 "searched":			SStore.searched,
				 "hasResults":		SStore.hasResults
			};

			//console.log("search rendered");
			//console.log(SStore.searchResults);

			var searchResults = _.map(SStore.searchResults, function(sr, srk) {
				 return (<li key={srk}> <Link to={Config.path.relative + "/" + sr.path} params={{path: sr.path}}>{sr.title}</Link> </li>)
			});

			if(_.isEmpty(searchResults))
				 searchResults = (<li className="no-result">No Results</li>);

			return (
					<div className={classnames(resultClasses)}>
						 <input type="text" placeholder="Search.." ref="submitSearch" value={this.state.searchValue} onChange={this.handleSearchChange} onKeyDown={this.handleSearchKeyDown}/>
						 <button className="submit-search" onClick={this.handleSearchKeyDown}></button>
						 <ul className="results">
								{searchResults}
						 </ul>
					</div>
			)
	 }
});