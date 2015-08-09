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

	listPortfolioItems: function() {
		var items = this.state.PortfolioStore.portfolio;

		return _.map(items, function (i, ik) {
			return (
				<article key={i.NID} className={classnames(["item"], "item-"+ik, "shadow")}>
					<div className="header">{i.title}</div>
					<div className="content">
						<Link to="portfolio.items" params={{page: (i.path).replace("/portfolio/", "")}}>
							<div className="view">
								<span>View</span>
							</div>

						</Link>
					</div>
					<div className="thumbnail">
						<img src={i.thumbnail.src} alt={i.thumbnail.alt} />
					</div>
				</article>
			)
		});
	},

	render: function() {
		console.log("portfolio.jsx");
		return (
			<section className="gc g12">
				<div className="text-style__default gwrapper portfolio-list">
					{this.props.body}
					{this.listPortfolioItems()}
				</div>
			</section>
		)
	}
});
