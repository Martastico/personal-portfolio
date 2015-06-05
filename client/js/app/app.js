"use strict";

var React = require('react');
var Router = require('react-router');
var $ = require('jquery');

var Home = require('./components/home/home.jsx');
var About = require('./components/about/about.jsx');

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;


var App = React.createClass({
	render: function() {
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
												<li> <a href="#" className="portfolio">Portfolio</a> </li>
												<li> <a href="#" className="freebies">Freebies</a> </li>
												<li> <a href="#" className="contact">Contact</a> </li>
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
									<div className="content">

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
		<Route name="about" handler={About}/>
		<DefaultRoute name="home" handler={Home} />
	</Route>
);

Router.run(routes, function (Handler) {
	React.render(<Handler/>, document.getElementById('app'));
});

//React.render(
//	<Site />,
//	document.getElementById('app')
//);

//debugger;

