"use strict";

// NPM Modules
var React	= require('react');
var _	= require('lodash');
var classnames 		= require('classnames');

// Search Widget
var SearchWidget = require('./search.jsx');

// Actions
var Actions = require('../../../actions/actions');

// TODO: Serverside Widgets
var _widgets = [
	 {
			name: "Search"
	 }
];

module.exports = React.createClass({

	 handleWidgets: function(e) {
			var widget = e.target.id;
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
								<button className={name} id={name} onClick={this.handleWidgets}> <span>Search</span> </button>
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
				 else return (null);
			}
	 },

	 render: function() {

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
