
// NPM Modules
var React 		 		= require('react');
var Reflux 		 		= require('reflux');
var Router 		 		= require('react-router');
var _ 				 		= require('lodash');
var classnames 		= require('classnames');

// Actions
var Actions			= require('../../actions/actions');

var Link 					= Router.Link;

// Todo: More robust

var Links = [
	 {
			id: 1,
			name: "Home",
			path: "home",
			type: "node",
			classes: "home"
	 },
	 {
			id: 2,
			name: "About",
			path: "about",
			type: "node",
			classes: "about"
	 },
	 {
			id: 3,
			name: "Portfolio",
			path: "portfolio",
			type: "node",
			classes: "portfolio"
	 },
	 {
			id: 4,
			name: "Freebies",
			path: "freebies",
			type: "node",
			classes: "freebies"
	 },
	 {
			id: 5,
			name: "Contact",
			path: "contact",
			type: "node",
			classes: "contact"
	 }
];


module.exports = React.createClass({

//	handleClick: function(e) {
//		// Close if clicked and is mobileNavi
//		if(!_.isUndefined(this.props.mobileNavi) && this.props.mobileNavi) Actions.widgetOpen("mobilenavi");
//	}, ///
	linkTemplate: function() {
		return _.map(Links, function(l, lk) {
			 return (
					 <li key={lk}>
							<Link to={l.type} params={{path: l.path}} onClick={this.handleClick} className={classnames(l.classes)}>
								 <span>{l.name}</span><span className="icon"></span>
							</Link>
					 </li>)
		}.bind(this))
	},
	render: function() {
		//return (<div>lol</div>);
		return (<ul>{this.linkTemplate()}</ul>);
	}
	 //render: function() {
		//	return (<div>lol</div>)
	 //}
});