
// NPM Modules
var React 		 		= require('react');
var Reflux 		 		= require('reflux');
var _ 				 		= require('lodash');

//// Stores
var RouteStore 	= require('../../stores/routeStore');

var PortfolioItems = require('../navigation/portfolioItems.jsx');

var Config = require('../../app.config');

module.exports = React.createClass({

	shouldComponentUpdate: function(nextProps) {
		return !_.isEqual(nextProps, this.props);
	},

	sidebarContent: function() {

		var path = this.props.RouteStore.state.path;

		if(path.replace(/^\/([^\/]*).*$/, '$1') === "portfolio") {
			return (
				<div className="content">
					<header>Recent Work</header>
					<PortfolioItems />
				</div>
			)
		} else {
			return false;
		}

	},

	render: function() {
		if(Config.dev) console.log("sidebar.jsx");

			return (
				<section id="main_column_sidebar">
					{this.sidebarContent()}
				</section>
			)

	}
});


