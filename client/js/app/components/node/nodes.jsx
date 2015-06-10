// Placeholder

var React 				= require('react');
var Reflux 				= require('reflux');
var _ 				 		= require('lodash');
var DocumentTitle	= require('react-document-title');

// Stores
var NodeStore = require('../../stores/nodeStore');

// Components
var Node 	= require('../../components/node/node.jsx');

// Stores
var RouteStore	= require('../../stores/routeStore');

module.exports = React.createClass({
	 mixins: [
			Reflux.connect(RouteStore,"RouteStore"),
			Reflux.connect(NodeStore,"NodeStore")
	 ],

	 shouldComponentUpdate: function(nextProps, nextState) {
			return !_.isEqual(nextProps, this.props);
	 },

	 renderNodes: function() {
			var filteredNode = _.filter(this.state.NodeStore.nodes, function (n, nk) {
				 return Number(n.NID) === Number(this.props.params.NID);
			}.bind(this));

			// No Nodes
			if(_.isEmpty(filteredNode)) {
				 return (<Node key={"nonode"}/>);
			}

			return _.map(filteredNode, function(n, nk) {
				 return (<Node node={n} key={n.NID}/>)
			});
	 },

	 render: function () {
			console.log("Nodes Loaded");
			return this.renderNodes()[0];

	 }
});