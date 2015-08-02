
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

	 linkTemplate: function() {
			console.log("linkTemplate");
			var path;
			var classes;

			return _.map(this.state.RouteStore.menu.main, function(l, lk) {
				 classes = [
						_.kebabCase(l.name),
						{
							 // WORKAROUND: Problem when rendering server side, for some reason it doesn't apply the ".active" class to the links...
							 // Todo: find solution for it.
							 "active" : (this.state.RouteStore.state.path === l.path) && !Config.isBrowser
						}
				 ];
				 path = {path: (l.path).replace('/', ''), splat: ""}
;
				 return (
						 <li key={lk}>
								<Link to={l.type} params={path} onClick={this.handleClick} className={classnames(classes)}>
									 <span>{l.name}</span><span className="icon"></span>
								</Link>
						 </li>)
			}.bind(this))
	 },
	 render: function() {
			console.log("mainNavi RENDERED");
			return (<ul>{this.linkTemplate()}</ul>);
	 }
});