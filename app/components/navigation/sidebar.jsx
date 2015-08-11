
// NPM Modules
var React 		 		= require('react');
var Reflux 		 		= require('reflux');
var _ 				 		= require('lodash');

//// Stores
var RouteStore 	= require('../../stores/routeStore');

var PortfolioItems = require('../navigation/portfolioItems.jsx');
//<PortfolioItems />

module.exports = React.createClass({

	shouldComponentUpdate: function(nextProps) {
		return !_.isEqual(nextProps, this.props);
	},

	render: function() {
		console.log("sidebar.jsx");
		var route = this.props.RouteStore;
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


