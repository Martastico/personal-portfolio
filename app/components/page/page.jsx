// Use it to have unique pages using nodes.

var React 				= require('react');
var Reflux = require('reflux');

var _ 				 		= require('lodash');
var classnames 		= require('classnames');
var $ 				 		= require('jquery');
var Helmet 				= require('react-helmet');
var Router = require('react-router');

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
		Reflux.connect(RouteStore,"RouteStore")
	],



	shouldComponentUpdate: function(nextProps, nextState) {
		return !_.isEqual(nextProps, this.props);
	},



	render: function() {
		var data = _.filter(this.state.NodeStore.nodes, function (n, nk) {
			this.props.params.path = !_.isUndefined(this.props.params.path) ? this.props.params.path : "home";
			return _.snakeCase(n.path) === _.snakeCase("/"+ this.props.params.path);
		}.bind(this))[0];


		console.log("Page Rendered");
		return <PageStyles key={data.NID} AppStore={this.state.AppStore} data={_.clone(data)}/>
	}
});