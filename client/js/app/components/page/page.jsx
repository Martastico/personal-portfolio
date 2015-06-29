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
			var content = $(React.findDOMNode(this.refs.main_content));

			setTimeout(function() { // Small delay because of browser support..
				 $(big_title).addClass("loaded").delay(400).show(function() {
						$(content).addClass("loaded");
				 });

				 // If Home
				 if(!_.isEmpty(this.props.data.style) && this.props.data.style.name === "index") {
						var pci1 = $(React.findDOMNode(this.refs.personalcounter_item_1)),
								pci2 = $(React.findDOMNode(this.refs.personalcounter_item_2)),
								pci3 = $(React.findDOMNode(this.refs.personalcounter_item_3)),
								pci4 = $(React.findDOMNode(this.refs.personalcounter_item_4)),
								index_gr = $(React.findDOMNode(this.refs.index_gr));

						//$(pci1).addClass("loaded spinner").delay(0).show(function() {
						//	 $(pci2).addClass("loaded spinner").delay(0).show(function() {
						//			$(pci3).addClass("loaded spinner").delay(0).show(function() {
						//				 $(pci4).addClass("loaded spinner").delay(0).show(function() {
						//						$(index_gr).addClass("loaded");
						//						$(pci1).addClass("perspective");
						//						$(pci2).addClass("perspective");
						//						$(pci3).addClass("perspective");
						//						$(pci4).addClass("perspective");
						//				 });
						//			});
						//	 });
						//});
						$(pci1).addClass("loaded spinner").delay(500).show(function() {
							 $(pci2).addClass("loaded spinner").delay(400).show(function() {
									$(pci3).addClass("loaded spinner").delay(400).show(function() {
										 $(pci4).addClass("loaded spinner").delay(1400).show(function() {
												$(index_gr).addClass("loaded");
												$(pci1).addClass("perspective");
												$(pci2).addClass("perspective");
												$(pci3).addClass("perspective");
												$(pci4).addClass("perspective");
										 });
									});
							 });
						});
				 }
			}.bind(this), 50);
	 },


	 componentWillLeave: function() {
			console.log("lol");
	 },

	 styles: function(data, route) {

			var title 	= data.showTitle ? (<h1 className="big-title" ref="big_title">{data.title}</h1>) : false;
			var body 		= !_.isEmpty(data.body) ? (<div className="body" dangerouslySetInnerHTML={{__html: data.body}}></div>) : false;
			var style 	= !_.isEmpty(data.style) ? data.style : false;
			var template = [];

			if (!style) {
				 template = (
						 <div className="gwrapper default">
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

			// Index
			if (style.name === "index") {
				 template = (
						 <div className={classnames([style.name, "gwrapper"])}>
								{title}
								<section className="gr top animation" ref="main_content">
									 <section className="gc g12">
											<div className="default">
												 <section id="personalCounter">
														<div className="item item-1 years" ref="personalcounter_item_1">
															 <h2>4</h2>
															 <div className="description"><span className="years-of">Years of </span><span className="experience">Experience</span></div>
														</div>
														<div className="item item-2 ideas" ref="personalcounter_item_2">
															 <h2>38</h2>
															 <div className="description"><span>Ideas Per Day</span></div>
														</div>
														<div className="item item-3 creativity" ref="personalcounter_item_3">
															 <h2>&#8734;</h2>
															 <div className="description"><span>Creativity</span></div>
														</div>
														<div className="item item-4 reasons" ref="personalcounter_item_4">
															 <h2>0</h2>
															 <div className="description"><span>Reasons To Quit</span></div>
														</div>
												 </section>
											</div>
									 </section>
								</section>
								<section className="gr bottom" ref="index_gr">
									 <section className="gc g12">
											<div className="default">
												 <div id="youDeserveTheBest">
														<h1>You deserve the best.</h1>
														<h2>Here is what I can help with.</h2>
												 </div>
											</div>
									 </section>

									 <section className="gc g12 no-spacing">
											{/*<div className="default">{body}</div>*/}
											<div className="index default">
												 <div id="helpWith">
														<div className="design item">
															 <div className="wrapper">
																	<div className="header">
																		 <h1>Design</h1>
																		 <span className="description">From Ideas To Visual Layout</span>
																	</div>
																	<div className="content">
																		 <div className="body">
																				<p>Do you have a great idea for the next website or application and you just want to be able to touch it? I can provide with a design that will work everywhere, be it phone, tablet, laptop, desktop or even TV.</p>
																				<p>Web design includes many different specialities and diciplines. I try to balance everything as much as possible and come out with a result that will please you.</p>
																		 </div>
																		 <div className="tldr">

																				<div className="header">
																					 <h2>tl;dr</h2>
																				</div>
																				<div className="items">
																					 <div className="item">
																							<div className="header">
																								 <h2>User Experience</h2>
																							</div>
																							<ul>
																								 <li><span>Information Design</span></li>
																								 <li><span>Interaction Design</span></li>
																								 <li><span>Research</span></li>
																								 <li><span>And More</span></li>
																							</ul>
																					 </div>
																					 <div className="item">
																							<div className="header">
																								 <h2>User Interface</h2>
																							</div>
																							<ul>
																								 <li><span>Visual Design</span></li>
																								 <li><span>Usability</span></li>
																								 <li><span>Responsive</span></li>
																							</ul>
																					 </div>
																				</div>
																		 </div>
																	</div>
															 </div>
														</div>

														<div className="development item">

															 <div className="wrapper">
																	<div className="header">
																		 <h1>Development</h1>
																		 <span className="description">From Design To Functionality</span>
																	</div>
																	<div className="content">
																		 <div className="body">
																				<p>The design and layout is right there... but you can&#39;t really do anything with it. Time to make it a reality and interactive!</p>
																				<p>I&#39;m able to first create the concept quickly, to see how it will feels and looks like, using HTML, CSS, Javascript. Once everything looks and feels awesome, it&#39;s time to make it production ready and release it to the masses. To your requirements I will assure the functionality works on every device you need!</p>
																		 </div>
																		 <div className="tldr">

																				<div className="header">
																					 <h2>tl;dr</h2>
																				</div>
																				<div className="items">
																					 <div className="item">
																							<div className="header">
																								 <h2>Programming Skills</h2>
																							</div>
																							<ul>
																								 <li><span>HTML & CSS (SCSS)</span></li>
																								 <li><span>Javascript</span></li>
																								 <li><span>NodeJS, ReactJS</span></li>
																							</ul>
																					 </div>
																					 <div className="item">
																							<div className="header">
																								 <h2>&nbsp;</h2>
																							</div>
																							<ul>
																								 <li><span>Prototyping</span></li>
																								 <li><span>Unit Testing</span></li>
																								 <li><span>And More</span></li>
																							</ul>
																					 </div>
																				</div>
																		 </div>
																	</div>
															 </div>
														</div>
												 </div>
											</div>
									 </section>
								</section>

						 </div>
				 )
			}

			return (<ReactCSSTransitionGroup transitionName="example">{template}</ReactCSSTransitionGroup>);

	 },

	 render: function() {
			console.log("page render");
			// Props: data, route
			var data = !_.isEmpty(this.props.data) ? this.props.data : false;
			var route = !_.isEmpty(this.props.route) ? this.props.route: false;

			var isNode = !_.isEmpty(this.props.route.params.path) && route;

			// TODO: Make it also accept node types.

			// If is node.
			if (isNode && data && route) return this.styles(data, route);
	 }
});