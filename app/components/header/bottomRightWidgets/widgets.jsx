"use strict";

// NPM Modules
var React	= require('react');
var _	= require('lodash');
var classnames 		= require('classnames');

// Search Widget
var SearchWidget = require('./search.jsx');
var Mobilenavi = require('./mobilenavi.jsx');

// Actions
var Actions = require('../../../actions/actions');

// TODO: Serverside Widgets
var _widgets = [
	 {
			name: "Search"
	 },
	 {
			name: "Mobilenavi"
	 }
].reverse();

module.exports = React.createClass({

	 shouldComponentUpdate: function(nextProps, nextState) {
			console.log("Update bottomRightWidgets widgets.jsx: " + !_.isEqual(nextProps, this.props));
			return !_.isEqual(nextProps, this.props);
	 },

	 handleWidgets: function(e) {
			var widget = e.target.id;
			ga('send', 'event', 'Header Widgets', 'Clicked', widget);
			Actions.widgetOpen(widget);
	 },

	 renderWidgets: function() {
			var openWidget = this.props.openWidget;

			return _.map(_widgets, function(w, wk) {
				 var name = _.kebabCase(w.name),
						 id = w.id;

				 var classes = [];

				 classes = [
						name,
						"widget-" + wk,
						 "ignore-react-onclickoutside"
				 ];

				 if(openWidget === name + "-open open") {
						classes.push("active");
				 }

				 return (
						 <li className={classnames(classes)} key={wk}>
								<button className={name} id={name} onClick={this.handleWidgets}><span>{w.name}</span></button>
						 </li>
				 );
			}.bind(this));

	 },

	 renderOpenWidgets: function() {
			var openWidget = this.props.openWidget;

			if(_.isEmpty(openWidget)) {
				 return (null);
			} else {
				 // Add Widget Components Here
				 if(openWidget === "search-open open") return ( <SearchWidget /> );
				 if(openWidget === "mobilenavi-open open") return ( <Mobilenavi /> );
				 else return (null);
			}
	 },

	 render: function() {
			console.log("Render: bottomRightWidgets .widgets.jsx");
			return (
					<section id="quickbuttons" className="widgets widgets-wrapper quickbuttons">
						 <ul>
								{this.renderWidgets()}
						 </ul>
						 <div className="widget">
								{this.renderOpenWidgets()}
						 </div>
					</section>
			)

	 }
});
