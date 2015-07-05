"use strict";

// NPM Modules
var React				= require('react');
var Reflux			= require('reflux');
var _ 					= require('lodash');
var classnames 	= require('classnames');

// Actions
var Actions			= require('../../../actions/actions');

// Config
var Config 	= require('../../../app.config');

// Stores
var SearchStore	= require('../../../stores/searchStore');

// Routes
var Router 		 		= require('react-router');
var Route 				= Router.Route;
var Link 					= Router.Link;


// Components
var MainNavi= require('../../navigation/mainNavi.jsx');

module.exports = React.createClass({
	 mixins: [require('react-onclickoutside')],

	 // If clicked outside the search wrapper, close it.
	 handleClickOutside: function(evt) {
			Actions.widgetOpen("mobilenavi");
	 },


	 render: function() {

			var resultClasses = {
				 "mobilenavi-widget": true,		// Default class
				 "wrapper": 			true
			};

			return (
					<ul className={classnames(resultClasses)}>
						 <MainNavi mobileNavi={true}/>
					</ul>
			)
	 }
});