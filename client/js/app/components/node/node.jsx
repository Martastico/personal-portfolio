// Placeholder

var React 				= require('react');
var _ 				 		= require('lodash');
var DocumentTitle	= require('react-document-title');

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
			console.log("Node Loaded");

			// Node Not Found
			if(_.isEmpty(this.props.node)) {
				 return (
						 <DocumentTitle title="Mart Saarman - Page Not Found">
								<div className="node-not-found">Node Not Found</div>
						 </DocumentTitle>
				 )
			}

			return (
					<DocumentTitle title={this.props.node.title + " | " + Config.appTitle}>
						 <Page route={this.props.route} data={this.props.node}/>
					</DocumentTitle>
			)
	 }
});