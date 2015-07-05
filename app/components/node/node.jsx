// Placeholder

var React 				= require('react');
var _ 				 		= require('lodash');

// Config
var Config = require('../../app.config');

// Components
var Page = require('../page/page.jsx');

module.exports = React.createClass({
	 //
	 //statics: {
	 //	willTransitionTo: function (transition, params) {
	 //		 //transition.replaceWith('/bob');
	 //	}
	 //},


	 shouldComponentUpdate: function(nextProps, nextState) {
			return !_.isEqual(this.props, nextProps);
	 },

	 render: function () {
			console.log("Node Rendered");

			// Node Not Found
			if(_.isEmpty(this.props.node)) {
				 return (
						 <div className="node-not-found">Node Not Found</div>
				 )
			}

			return (
					<Page route={this.props.route} data={this.props.node}/>
			)
	 }
});