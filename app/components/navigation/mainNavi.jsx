
// NPM Modules
var React 		 		= require('react');
var Reflux 		 		= require('reflux');
var Router 		 		= require('react-router');
var _ 				 		= require('lodash');
var classnames 		= require('classnames');

var Config 			= require('../../app.config');

//// Stores
var RouteStore 	= require('../../stores/routeStore');

// Actions
var Actions			= require('../../actions/actions');

var Link 					= Router.Link;



module.exports = React.createClass({
	mixins: [Reflux.connect(RouteStore,"RouteStore")],

	handleClick: function(e) {
		// Close mobile navi if clicked and is mobileNavi 
		if(!_.isUndefined(this.props.mobileNavi) && this.props.mobileNavi) Actions.widgetOpen("mobilenavi");
	},

	linkConstruction: function(data) {
		var classes;
		classes = [
			_.kebabCase(data.name)
		];
		if (data.path === "" || data.path === "/portfolio") {
			data.path = data.path === "" ? "home" : data.path;
			return (
				<Link to={data.path} onClick={this.handleClick} className={classnames(classes)}>
					<span>{data.name}</span><span className="icon"></span>
				</Link>
			)
		} else {
			return (
				<Link to={data.type} params={{page: (data.path).replace('/', '')}} onClick={this.handleClick} className={classnames(classes)}>
					<span>{data.name}</span><span className="icon"></span>
				</Link>
			)
		}
	},

	linkTemplate: function() {
		//console.log("linkTemplate");
		var path;

		return _.map(this.state.RouteStore.menu.main, function(l, lk) {
			//	return _.map(menus, function(l, lk) {
			path = {path: (l.path).replace('/', ''), splat: ""};
			return (
				<li key={lk}>
					{this.linkConstruction({type: l.type, name: l.name, path: l.path})}
				</li>)
		}.bind(this))
	},

	render: function() {
		//console.log("mainNavi RENDERED");
		//return (<div>nothing</div>);
		return (<ul>{this.linkTemplate()}</ul>);
	}
});