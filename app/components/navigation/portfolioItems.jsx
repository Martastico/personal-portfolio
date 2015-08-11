"use strict";

// NPM Modules
var React	= require('react');
var Reflux	= require('reflux');
var _	= require('lodash');
var classnames 		= require('classnames');


var Router 		 		= require('react-router');
var Link 					= Router.Link;

// Actions
var Actions = require('../../actions/actions');

// Store
var PortfolioStore = require('../../stores/portfolioStore');

module.exports = React.createClass({
	mixins: [Reflux.connect(PortfolioStore,"PortfolioStore")],

	linkConstruction: function(data) {
		return (
			<Link to="portfolio.items" data-lol="123" params={{page: data.path}}>
				<span>{data.title}</span>
			</Link>
		)
	},

	linkTemplate: function() {
		var path;

		return _.map(this.state.PortfolioStore.portfolio, function(l, lk) {
			path = (l.path).replace("/portfolio/", "");
			return (
				<li key={lk}>
					{this.linkConstruction({title: l.title, path: path})}
				</li>)
		}.bind(this))
	},

	render: function() {
		//console.log("mainNavi RENDERED");
		//return (<div>nothing</div>);
		return (<ul>{this.linkTemplate()}</ul>);
	}
});