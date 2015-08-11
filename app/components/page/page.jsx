// Use it to have unique pages using nodes.

var React 				= require('react');
var Reflux = require('reflux');

var _ 				 		= require('lodash');
var classnames 		= require('classnames');
var $ 				 		= require('jquery');
var Helmet 				= require('react-helmet');
var Router = require('react-router');
var State = require('react-router').State;

// Stores
var NodeStore = require('../../stores/nodeStore');
var AppStore 		= require('../../stores/appStore');
var RouteStore 		= require('../../stores/routeStore');

// Components
var PageStyles = require('./pageStyles.jsx');

// Config
var Config = require('../../app.config');

var _Data = {};

// TODO: Make it more dynamic.
// TODO: Ability to define styles from server side
module.exports = React.createClass({
	mixins: [
		Router.Navigation,
		Reflux.connect(AppStore,"AppStore"),
		Reflux.connect(NodeStore,"NodeStore"),
		Reflux.connect(RouteStore,"RouteStore"),
		State,
	],

	shouldComponentUpdate: function(nextProps, nextState) {
		return !_.isEqual(nextProps, this.props);
	},

	render: function() {
		var data = _.filter(this.state.NodeStore.nodes, function (n, nk) {
			n.path = n.path === "/home" ? "/" : n.path;
			return n.path === this.getPath();
		}.bind(this))[0];

		if (_.isEmpty(data)) {
			return (<div>Error</div>)
		}

		if(Config.dev) console.log("Page Rendered");
		return <PageStyles key={data.NID} AppStore={this.state.AppStore} data={_.clone(data)}/>
	}
});