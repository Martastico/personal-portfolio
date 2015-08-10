
// NPM Modules
var React 		 		= require('react');
var Reflux 		 		= require('reflux');
var _ 				 		= require('lodash');

//// Stores
var RouteStore 	= require('../../stores/routeStore');

var PortfolioItems = require('../navigation/portfolioItems.jsx');
//<PortfolioItems />

module.exports = React.createClass({
	mixins: [Reflux.connect(RouteStore,"RouteStore")],

	//shouldComponentUpdate: function(nextProps, nextState) {
	//	console.log("SHOULD SIDEBAR UPDATE? " + !_.isEqual(nextState, this.state));
	//	return !_.isEqual(nextState, this.state);
	//},

	render: function() {
		var route = this.state.RouteStore;
		var path = route.state.path;

		if((path.replace(/^\/([^\/]*).*$/, '$2'))) {
			return (
				<section id="main_column_sidebar">
					<header>Recent Work</header>
					<PortfolioItems />
				</section>
			)
		}
		return false;
	}
});


