var React	      = require('react');
var Reflux			= require('reflux');
var _ 				= require('lodash');
var classnames 	= require('classnames');

// Actions
var Actions			= require('../../actions/actions');

// Stores
var UserStore	   = require('../../stores/userStore');

//
// Currently a placeholder for later implementation of user authendication
//

module.exports    = React.createClass({

	mixins: [
		//require('react-onclickoutside'),
		Reflux.connect(UserStore,"UserStore")
	],

	componentDidMount: function() {
		this.refs.userfield.getDOMNode().focus();
	},

	componentWillMount: function() {
		if(!_.isEmpty(this.state.UserStore.login.user)) {
			this.setState({user: this.state.UserStore.login.user})
		}
	},

	componentWillUnmount: function() {
		Actions.resetLoginForm();
	},

	handleSearchChange: function(e) {
		if(e.target.value.slice(-1) !== "\n") {
			if(e.target.className === "user") {
				this.setState({user: e.target.value})
			}
			if(e.target.className === "pass") {
				this.setState({pass: e.target.value})
			}
		}
	},

	handleSearchKeyDown: function(e) {
		if (!this.state.UserStore.login.loading && (e.keyCode === 13 || e.target.className === "submit")) {
			Actions.userLogin(this.state);
			this.setState({pass: ""})
		}
		if(e.keyCode === 27) {
			Actions.widgetOpen("user-login");
		}
	},

	render: function() {
		var uStore = this.state.UserStore;
		var messages = !uStore.login.authendication ? (<div className="messages">Incorrect User/Pass</div>) : false;

		var resultClasses = {
			"user-login-widget": true,
			"wrapper": true,
			"authendication-fail": !uStore.login.authendication,
			"loading": uStore.login.loading
		};
		return (
			<section className={classnames(resultClasses)}>
				<header>
					<h3>Login</h3>
					<div className="warnings">
						<span className="warning-icon">Warning</span>
						{messages}
					</div>
				</header>
				<div className="fields">
					<input type="text" className="user" ref="userfield" onChange={this.handleSearchChange} value={this.state.user} onKeyDown={this.handleSearchKeyDown} placeholder="Username"/>
					<input type="password" className="pass" onChange={this.handleSearchChange} value={this.state.pass} onKeyDown={this.handleSearchKeyDown} placeholder="password"/>
					<button className="submit" onClick={this.handleSearchKeyDown}><span className="submit">Login</span></button>
				</div>
			</section>
		)
	}
});