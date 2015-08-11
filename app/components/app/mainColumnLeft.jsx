// NPM
var React      = require('react/addons');

// Components
var MainNavi	= require('../navigation/mainNavi.jsx');

module.exports = React.createClass({

	shouldComponentUpdate: function(nextProps, nextState) {
		return nextProps.AppStore.classes.routeLoading !== this.props.AppStore.classes.routeLoading;
	},

	render: function() {
		console.log("mainColumnLeft.jsx");
		return (
			<section id="main_column_left">
				<div id="main_column_left_widgets">
					<div className="content">
						<nav id="main_column_left_navi" className="widget-1 widget widget-wrapper">
							<MainNavi />
						</nav>
					</div>
				</div>
				<footer>
					<div className="bottom">
						<div className="country left">
							<h3 className="country">Finland</h3>
						</div>
					</div>
				</footer>
			</section>
		)
	}
});