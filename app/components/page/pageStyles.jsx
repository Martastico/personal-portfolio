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

				//require("../../vendor/rAF");

				this.indexPageAnimation();
				$(content).addClass("loaded");
			} else {
				$(big_title).addClass("loaded").delay(400).show(function() {
					$(content).addClass("loaded");
				});
			}


		}.bind(this), 120);

	},

	indexPageAnimation: function() {
		var width, height, largeHeader, canvas, ctx, circles, target, animateHeader = true;

		console.log("#### indexPageAnimation ####");

		// Main
		initHeader();
		addListeners();

		function initHeader() {
			width = window.innerWidth;
			height = $('#main_column_middle').height();
			target = {x: 0, y: height};

			largeHeader = document.getElementById('index-top');
			largeHeader.style.height = height+'px';

			canvas = document.getElementById('index-top-background');
			canvas.width = width;
			canvas.height = height;
			ctx = canvas.getContext('2d');

			// create particles
			circles = [];
			for(var x = 0; x < width*0.3; x++) {
				var c = new Circle();
				circles.push(c);
			}
			animate();
		}

		// Event handling
		function addListeners() {
			window.addEventListener('scroll', scrollCheck);
			window.addEventListener('resize', resize);
		}

		function scrollCheck() {
			if(document.body.scrollTop > height) animateHeader = false;
			else animateHeader = true;
		}

		function resize() {
			width = window.innerWidth;
			height = $('#main_column_middle').height();
			largeHeader.style.height = height+'px';
			canvas.width = width;
			canvas.height = height;
		}

		function animate() {
			if(animateHeader) {
				ctx.clearRect(0,0,width,height);
				for(var i in circles) {
					circles[i].draw();
				}
			}
			window.requestAnimationFrame(animate);
		}

		// Canvas manipulation
		function Circle() {
			var _this = this;

			// constructor
			(function() {
				_this.pos = {};
				init();
				//console.log(_this);
			})();

			function init() {
				_this.pos.x = Math.random()*width;
				_this.pos.y = Math.random()*300;
				_this.alpha = 0.3+Math.random()*0.5;
				_this.scale = 0.1+Math.random()*0.35;
				_this.velocity = Math.random();
			}

			this.draw = function() {
				if(_this.alpha <= 0) {
					init();
				}
				_this.pos.y += _this.velocity;
				_this.alpha -= 0.008;
				ctx.beginPath();
				ctx.arc(_this.pos.x, _this.pos.y, _this.scale*3, 0, 10 * Math.PI, false);
				ctx.fillStyle = 'rgba(255,255,255,'+ _this.alpha+')';
				ctx.fill();
			};
		}

		$(window).unbind("scroll").scroll(function () {
			$("#index-top").css("background-position-y", "0px " + -(Math.max(e.scrollTop, a.scrollTop) / 8) + "px");
		});

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