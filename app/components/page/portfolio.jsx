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

	mixins: [
		//require('react-onclickoutside'),
		Reflux.connect(PortfolioStore,"PortfolioStore")
	],

	// <Link to="portfolio.items" params={{page: "elwis"}}>Asd</Link>

	render: function() {
		return (
			<section className="gc g12">
				<div className="text-style__default gwrapper">
					{this.props.body}
					<Link to="portfolio.items" params={{page: "elwis"}}>Asd</Link>
				</div>
			</section>
		)
	}
});
