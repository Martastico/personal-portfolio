// NPM
var React      = require('react/addons');

// Components
var MainNavi	= require('../navigation/mainNavi.jsx');

module.exports = React.createClass({
	render: function() {
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