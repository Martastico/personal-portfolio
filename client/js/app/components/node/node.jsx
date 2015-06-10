// Placeholder

var React 				= require('react');
var _ 				 		= require('lodash');
var DocumentTitle	= require('react-document-title');

module.exports = React.createClass({

	 shouldComponentUpdate: function(nextProps, nextState) {
			return !_.isEqual(this.props, nextProps);
	 },

	 render: function () {
			console.log("Node Loaded");

			var node = !_.isEmpty(this.props.node) ? this.props.node : false;
			var title = node.showTitle ? (<h1 className="big-title">{node.title}</h1>) : false;
			var body = !_.isEmpty(node.body) ? (<div className="body" dangerouslySetInnerHTML={{__html: node.body}}></div>) : false;

			// Node Not Found
			if(!node) {
				 return (
						 <DocumentTitle title="Mart Saarman - Page Not Found">
								<div className="node-not-found">Node Not Found</div>
						 </DocumentTitle>
				 )
			}

			return (
					<DocumentTitle title={node.title}>
						 <div className="content">
								<div className="default">
									 {title}
									 {body}
								</div>
						 </div>
					</DocumentTitle>
			)
	 }
});