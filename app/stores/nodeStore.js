
var Reflux 			= require('reflux');
var Actions 		= require('../actions/actions.js');
var _ 					= require('lodash');
var request 		= require('superagent');

// Config
var Config 		= require('../app.config');

// Stores
var NodesStore 	= require('../stores/nodeStore');



var _data = {
	nodes: []
};


module.exports = Reflux.createStore({
	listenables: Actions,

	getInitialState: function() {
		return _data;
	},

	fetchNode: function(path) {

		console.log("path '/" + path + "' did not exist, requesting to load node from server if node exists");
		// TODO: REplace with real query

		console.log("Node: " + Config.path.api + "/page/" + path);
		request.get(Config.path.api + "/page/" + path)
			.set('Accept', 'application/json')
			.end(function(err, res) {
			if(!err) {
				// Success
				console.log("Successfully requested node for path '/" + path + "'");
				// If body is empty, add not found to it.
				if(_.isEmpty(res.body)) {
					res.body[0] = {
						NID: '0',
						path: '/' + path,
						type: 'pages',
						date: '0',
						title: 'Page Not Found 404',
						showTitle: '1',
						title_alt: 'Page Not Found (404)',
						style: 'default',
						body: 'The page you\'re looking for doesn\'t seem to exist... Sorry'
					};
					res.status = 404;
				}
				this.updateNodes(res);
			} else {
				// Handle Errors
				// todo: more robust
				// If there's an error, an uuid[0].value -1 is created with the path provided.
				// So when going back to same path it will retry to get the node.
				if(!_.isUndefined(res)) {
					if(res.status === 404) {
						console.log("404 - path '/" + path + "' not found");
						this.updateNodes(res);
					}
				} else {
					this.updateNodes(res);
				}
			}
		}.bind(this));
	},


	// New Node/Page has been fetched
	updateNodes: function(res) {

		var old_time = new Date();
		var nodes = _.clone(_data.nodes);

		// Remove node if Path exists within receivedNodes and replace with the new received node
		var existingNodes = _.filter(nodes, function(en, enk) {
			var update = true;
			_.forEach(res.body, function (rn, rnk) {
				// en.error is to determine wether it has to be requeried due to errors.
				//console.log(rn);
				if((_.snakeCase(en.path) === _.snakeCase(rn.path)) && en.NID === -1) update = false;
			});
			return update;
		});


		_.forEach(res.body, function (rn, rnk) {
			existingNodes.push(rn)
		});

		_data.nodes = _.clone(existingNodes);
		var test = _.clone(_data);

		this.updateApp(test);

		var new_time = new Date();

		//console.log("%cupdateNodes: " + (new_time - old_time) + "ms", "color: blue");
		Actions.getDataRoute.completed(res);
	},

	// Perform a test to check wheter node exists, if not,  fetch it.
	doesNodeExist: function(State) {
		// Empty paths will be set as /home. This will only happen if there is no path
		var path = _.isEmpty(State.params.path) ? "home" : State.params.path;

		console.log("Checking if path '/" + path + "' with node exists");

		// Disable caching if server rendering.
		_data.nodes = Config.isBrowser ? _data.nodes : [];

		// If empty, fetch node from server.
		var nodeExists = _.filter(_data.nodes, function(n, nk) {
			return (_.kebabCase(n.path) === _.kebabCase(path)) && n.NID !== -1;
		});

		// Node doesn't exist, fetch it from server.
		if(_.isEmpty(nodeExists)) {
			this.fetchNode(path);
		} else {
			// Node exists, show it.
			console.log("path '/" + path + "' exists, displaying now");
			// Cached status
			Actions.getDataRoute.completed({body: nodeExists, status: 200});
		}

	},

	onGetDataRoute: function(name, State) {
		//console.log("getDataRoute: " + name);
		if(name === "node") {
			this.doesNodeExist(State);
		}
	},

	updateApp: function(data) {
		//console.log("-----------UPDATE APP ------------");
		//this.trigger(data);
	}

});
