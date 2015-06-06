"use strict";

var React = require('react');
var Router = require('react-router');
var $ = require('jquery');

// Scrollbar
require('malihu-custom-scrollbar-plugin')($);

var Home = require('./components/home/home.jsx');
var About = require('./components/about/about.jsx');

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;


var App = React.createClass({
	 componentDidMount: function() {
			var mainColumnMiddleContent = React.findDOMNode(this.refs.mainColumnMiddleContent);

			$(mainColumnMiddleContent).mCustomScrollbar({
				 theme:"mcc",
				 scrollInertia: 150
			});
	 },

	 render: function() {
			debugger;
			return (
					<div className="page-wrapper">
						 <img id="image-background" style={{backgroundImage: 'url(image/bigbg_1.jpg)'}} alt="Saarman Background"/>
						 <section id="page">
								<div className="content">
									 <header id="header">
											<div className="top">
												 <div className="left">
														<div className="logo">
															 <a href="#">
																	<img src="image/logo-dark.svg" alt="Mart Saarman"/>
															 </a>
														</div>
												 </div>
												 <div className="right">
														right
												 </div>
											</div>
											<div className="bottom">
												 <div className="left">
														Web Designer &amp; Developer
												 </div>
												 <div className="right">
														<section id="main_search" className="widgets widgets-wrapper widget-1 search">
															 <input type="text" placeholder="Search"/>
														</section>
												 </div>
											</div>
									 </header>
									 <div className="main-content-wrapper">
											<section id="main_content">
												 <section id="main_column_left">
														<div id="main_column_left_widgets">
															 <div className="content">
																	<ul id="main_column_left_navi" className="widget-1 widget widget-wrapper">
																		 <li> <Link to="home" className="home">Home</Link> </li>
																		 <li> <Link to="about" className="about">About Myself</Link> </li>
																		 <li> <Link to="me1" className="portfolio">Portfolio</Link> </li>
																		 <li> <Link to="me2" className="freebies">Freebies</Link> </li>
																		 <li> <Link to="me3" className="contact">Contact</Link> </li>
																	</ul>
															 </div>
														</div>
														<footer>
															 <h3 className="country">Finland</h3>
															 <div className="bottom">
																	<div className="phone left">+358 400 545955</div>
																	<div className="email right">mart@saarman.net</div>
															 </div>
														</footer>
												 </section>
												 <section id="main_column_middle">
														<div className="content" ref="mainColumnMiddleContent">

															 <RouteHandler/>

														</div>
												 </section>
											</section>
									 </div>
								</div>
						 </section>
					</div>
			)
	 }

});

var routes = (
		<Route name="app" path="/" handler={App}>
			 <Route name="about" handler={About} />

			 <Route name="me1" path="/about/1" handler={About} />
			 <Route name="me2" path="/about/2" handler={About} />
			 <Route name="me3" path="/about/3" handler={About} />
			 <Route name="me4" path="/about/4" handler={About} />

			 <DefaultRoute name="home" handler={Home} />
		</Route>
);

Router.run(routes, function (Handler) {
	 React.render(<Handler/>, document.getElementById('app'));
});

