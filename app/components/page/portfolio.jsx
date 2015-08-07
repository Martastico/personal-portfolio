"use strict";

// NPM Modules
var React	= require('react');
var Reflux	= require('reflux');
var _	= require('lodash');
var classnames 		= require('classnames');

// Actions
var Actions = require('../../actions/actions');

// Store
var PortfolioStore = require('../../stores/portfolioStore');

module.exports = React.createClass({

	mixins: [
		//require('react-onclickoutside'),
		Reflux.connect(PortfolioStore,"PortfolioStore")
	],


	render: function() {
		console.log("portfolio.jsx");
		console.log(this.state.PortfolioStore);
		return (
			<section className="gr animation">
				<section className="gc g12">
					<div className="text-style__default gwrapper">
						{this.props.body}
					</div>
				</section>
			</section>
		)

	}
});
