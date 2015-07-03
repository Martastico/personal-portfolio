// Use it to have unique pages using nodes.

var React 				= require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var _ 				 		= require('lodash');
var classnames 		= require('classnames');
var $ 				 		= require('jquery');

// TODO: Make it more dynamic.
// TODO: Ability to define styles from server side
module.exports = React.createClass({

	 componentDidMount: function() {
			var big_title = $(React.findDOMNode(this.refs.big_title));
			var content = $(".gr.animation");


			// Do animations here for specific custom pages..
			setTimeout(function() { // Small delay because of browser support..
				 $(big_title).addClass("loaded").delay(400).show(function() {
						$(content).addClass("loaded");
				 });

				 // If Home
				 if(!_.isEmpty(this.props.data.style) && this.props.data.style.name === "index") {
						var pci1 = $(".index .main_content .personalcounter_item_1"),
								pci2 = $(".index .main_content .personalcounter_item_2"),
								pci3 = $(".index .main_content .personalcounter_item_3"),
								pci4 = $(".index .main_content .personalcounter_item_4"),
								index_bottom = $(".index > .body > .bottom");

						$(pci1).addClass("loaded spinner").delay(500).show(function() {
							 $(pci2).addClass("loaded spinner").delay(400).show(function() {
									$(pci3).addClass("loaded spinner").delay(400).show(function() {
										 $(pci4).addClass("loaded spinner").delay(1400).show(function() {
												$(index_bottom).addClass("loaded");
												$(pci1).addClass("perspective");
												$(pci2).addClass("perspective");
												$(pci3).addClass("perspective");
												$(pci4).addClass("perspective");
										 });
									});
							 });
						});
				 }
			}.bind(this), 150);
	 },


	 componentWillLeave: function() {
			console.log("lol");
	 },

	 styles: function(data, route) {

			var title 	= data.showTitle ? (<h1 className="big-title" ref="big_title">{data.title}</h1>) : false;
			var body 		= !_.isEmpty(data.body) ? (<div className="body" dangerouslySetInnerHTML={{__html: data.body}}></div>) : false;
			var style 	= !_.isEmpty(data.style) ? data.style : false;
			var template = [];

			// Style: Default
			if (!style) {
				 template = (
						 <div className={"gwrapper default " + _.kebabCase(data.path)}>
								{title}
								<section className="gr animation" ref="main_content">
									 <div className="gc g12">
											<div className="content">
												 <div className="default">
														{body}
												 </div>
											</div>
									 </div>
								</section>
						 </div>
				 )
			}

			// Style: Index
			if (style.name === "index") {
				 template = (
						 <div className={classnames([style.name, "gwrapper"])}>
								{title}
								{body}
						 </div>
				 )
			}

			return (<ReactCSSTransitionGroup transitionName="example">{template}</ReactCSSTransitionGroup>);

	 },

	 render: function() {
			console.log("Page Rendered");
			// Props: data, route
			var data = !_.isEmpty(this.props.data) ? this.props.data : false;
			var route = !_.isEmpty(this.props.route) ? this.props.route: false;
			var isNode = !_.isEmpty(this.props.route.params.path) && route;

			// TODO: Make it also accept node types.

			// If is node.
			if (isNode && data && route) return this.styles(data, route);
	 }
});