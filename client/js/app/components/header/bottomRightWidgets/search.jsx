"use strict";

// NPM Modules
var React	= require('react');
var Actions	= require('../../../actions/actions');

module.exports = React.createClass({
	 mixins: [
			require('react-onclickoutside')
	 ],

	 handleClickOutside: function(evt) {
			Actions.widgetOpen("search");
	 },

	 getInitialState: function() {
			return {searchValue: ""};
	 },

	 searchSubmit: function() {
			//this.setState({searchValue: ""});
			console.log("searching");
	 },

	 handleSearchChange: function(e) {
			if(event.target.value.slice(-1) !== "\n") {
				 this.setState({searchValue: e.target.value})
			}
	 },

	 handleSearchKeyDown: function(e) {
			if (e.keyCode == 13 || e.target.className === "submit-search") {
				 return this.searchSubmit();
			}
	 },

	 componentDidMount: function() {
			this.refs.searchField.getDOMNode().focus();
	 },

	 render: function() {

			console.log("search rendered");

			return (
					<div className="search-widget wrapper">
						 <input type="text" placeholder="Search.." ref="searchField" value={this.state.searchValue} onChange={this.handleSearchChange} onKeyDown={this.handleSearchKeyDown}/>
						 <button className="submit-search" onClick={this.handleSearchKeyDown}></button>
					</div>
			)
	 }
});