// Placeholder

var React 				= require('react');
var Reflux 				= require('reflux');
var _ 				 		= require('lodash');

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
			var params = _.isUndefined(this.props.params) ? {path: "/home"} : this.props.params;

			var filteredNode = _.filter(this.state.NodeStore.nodes, function (n, nk) {
				 return _.snakeCase(n.path) === _.snakeCase(params.path);
			}.bind(this));

			//// No Nodes
			if(_.isEmpty(filteredNode)) {
				 return [(<Node key={"nonode"}/>)];
			}


			// TODO: Multiple nodes
			return _.map(filteredNode, function(n, nk) {
				 return (<Node node={n} route={this.state.RouteStore} key={n.NID}/>);
			}.bind(this));
	 },

	 render: function () {
			console.log("Nodes Rendered");
			return this.renderNodes()[0];
			//return (<div>lol</div>);
	 }
});