// NPM
var React      = require('react/addons');
var $          = require('jquery');

// Router
var Router        = require('react-router');
var RouteHandler  = Router.RouteHandler;
var Link 			= Router.Link;

var Config = require('../../app.config');

module.exports = React.createClass({
	//shouldComponentUpdate: function(nextProps, nextState) {
	//	return nextProps.AppStore.classes.routeLoading !== this.props.AppStore.classes.routeLoading;
	//},

	componentDidMount: function() {
		var mainColumnMiddleContent = React.findDOMNode(this.refs.mainColumnMiddleContent);

		// Loaded
		$(mainColumnMiddleContent).addClass("loaded");

	},

	render: function() {
		if(Config.dev) console.log("mainColumnMiddle.jsx");
		return (
			<section id="main_column_middle">
				<div className="content" ref="mainColumnMiddleContent">
					<div id="main_scroll" className="scroll">
						<RouteHandler/>
					</div>
				</div>
				<div className="loading">
					<span>loading</span>
				</div>
			</section>
		)
	}
});