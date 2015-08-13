var React   = require('react');
var Reflux  = require('reflux');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var _ 				= require('lodash');
var classnames 	= require('classnames');
var $ 				= require('jquery');
var Helmet        = require('react-helmet');

var Portfolio     = require('../page/portfolio.jsx');



// Config
var Config = require('../../app.config');

module.exports = React.createClass({

	shouldComponentUpdate: function(nextProps, nextState) {
		if(Config.dev) console.log("SHOULD PAGESTYLES UPDATE? " + !_.isEqual(nextProps, this.props));
		return !_.isEqual(nextProps, this.props);
	},

	// Using jquery animation etc here.
	componentDidMount: function() {
		var big_title = $(React.findDOMNode(this.refs.big_title));
		var content = $(".gr.animation");
		var SApp = this.props.AppStore;
		var data = this.props.data;
		// Do animations here for specific custom pages..

		window.sr = require('scrollreveal')({
			viewport: document.getElementById("main_scroll"),
			vFactor: 0.30
		});

		setTimeout(function() { // Small delay because of browser support..

			if(this.props.data.style === "index") {
				$(content).addClass("loaded");
			} else {
				$(big_title).addClass("loaded").delay(400).show(function() {
					$(content).addClass("loaded");
				});
			}


		}.bind(this), 120);
	},

	styles: function() {
		var data             = this.props.data;

		data.title           = _.isEmpty(data.title_alt) ? data.title : data.title_alt;

		var title 	         = _.isUndefined(data.showTitle) || data.showTitle ? (<h1 className="big-title" ref="big_title"><span className="gwrapper">{data.title}</span></h1>) : false;
		var body 		      = !_.isEmpty(data.body) ? (<div className="body" dangerouslySetInnerHTML={{__html: data.body}}></div>) : false;
		var style 	         = !_.isEmpty(data.style) ? data.style : false;
		var template         = [];

		var metaTitle        = !_.isEmpty(data.meta_title)       ? data.meta_title : data.title;
		var metaDescription  = !_.isEmpty(data.meta_description) ? data.meta_description : "";
		var metaRelAuthor    = !_.isEmpty(data.meta_rel_author)  ? data.meta_rel_author : "";
		var ogImage          = !_.isEmpty(data.og_image)  ? data.og_image : {src: "http://api.saarman.net/sites/default/files/slogo.jpg"};
		var ogType           = !_.isEmpty(data.og_type)  ? data.og_type : "article";

		var metaData = {
			title: "Mart Saarman | " + metaTitle,
			description: metaDescription
		};

		// Style: Default
		if (!style || style === "default") {
			template = (
				<div className={"text-style__default " + _.kebabCase(data.path)}>
					{title}
					<section className="gr animation">
						{body}
					</section>
				</div>
			)
		}

		if (!style || style === "empty") {
			template = (
				<div className={"text-style__default " + _.kebabCase(data.path)}>
					{title}
					<section className="gr animation">
						<section className="gc g12">
							<div className="text-style__default gwrapper">
								{body}
							</div>
						</section>
					</section>
				</div>
			)
		}

		// Style: Index
		if (style === "index") {
			template = (
				<div className={classnames([style, "text-style__default"])}>
					{title}
					{body}
				</div>
			)
		}

		// Style: Portfolio
		if (style === "portfolio_items") {
			template = (
				<div className={classnames([style, "text-style__default"])}>
					{title}
					<section className="gr animation">
						{body}
					</section>
				</div>
			)
		}
		if (style === "portfolio") {
			template = (
				<div className={classnames([style, "text-style__default"])}>
					{title}
					<section className="gr animation">
						<Portfolio body={body} />
					</section>
				</div>
			)
		}

		return (
			<Helmet
				title = {metaData.title}
				meta={[
					{"name": "description", "content": metaData.description},
					{"property": "og:title", "content": metaTitle},
					{"property": "og:description", "content": metaDescription},
					{"property": "og:image", "content": ogImage.src},
					{"property": "og:type", "content": ogType}
				]}
				link={[
			      {"rel": "author", "href": metaRelAuthor}
			   ]}
				>
				{template}
			</Helmet>
		);

	},

	render: function() {
		return (this.styles());
	}
});