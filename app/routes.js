// NPM
var React         = require('react/addons');

// Router
var Router        = require('react-router');
var Route 			= Router.Route;
var DefaultRoute 	= Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

// Components
var Application  = require('./components/app.jsx');
var Page = require('./components/page/page.jsx');


module.exports = (
	<Route path="/" handler={Application}>

		<DefaultRoute name="home" handler={Page} />

		<Route name="portfolio" path="portfolio">
			<DefaultRoute handler={Page} />
			<Route name="portfolio.items" path=":page" handler={Page} />
		</Route>

		<Route name="pages" path=":page" handler={Page} />

		<NotFoundRoute handler={Page} />

	</Route>
);