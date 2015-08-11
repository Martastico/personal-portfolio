// NPM
var React      = require('react/addons');
var Reflux     = require('reflux');
var classnames = require('classnames');

// Stores
var AppStore = require('../../stores/appStore');

// Router
var Router        = require('react-router');
var RouteHandler  = Router.RouteHandler;
var Link 			= Router.Link;

// Actions
var Actions			= require('../../actions/actions');

// Components
var HeaderBottomRightWidgets = require('../header/bottomRightWidgets/widgets.jsx');

module.exports = React.createClass({

	render: function() {
		// Available Props:
		// AppStore

		var SApp = this.props.AppStore;

		// Element Classes
		var HeaderBottomRightWidgets__Classes = [
			"right",
			SApp.classes.openWidget
		];

		return (
			<header id="header">
				<div className="top">
					<div className="left">
						<div className="logo">
							<Link to="/" className="home"></Link>
						</div>
					</div>
					<div className="right">
						<button id="fullscreen" onClick={Actions.fullScreen}><span>Full Screen App</span></button>
					</div>
				</div>
				<div className="bottom">
					<div className="left">
						<span>Web Designer &amp; Developer in Finland</span>
					</div>
					<div className={classnames(HeaderBottomRightWidgets__Classes)}>
						<HeaderBottomRightWidgets openWidget={HeaderBottomRightWidgets__Classes[1]}/>
					</div>
				</div>
			</header>
		)
	}
});