
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

	 emptyNodes: function() {

	 },

	 fetchNode: function(path) {

			console.log("path '/" + path + "' did not exist, requesting to load node from server if node exists");
			// TODO: REplace with real query

			request.get(Config.path.api + "/page/" + path).end(function(err, res) {
				 if(!err) {
						// Success
						console.log("Successfully requested node for path '/" + path + "'");
						this.updateNodes(res.body);
				 } else {
						// Handle Errors
						// todo: more robust
						// If there's an error, an uuid[0].value -1 is created with the path provided.
						// So when going back to same path it will retry to get the node.
						if(!_.isUndefined(res)) {
							 if(res.status === 404) {
									console.log("404 - path '/" + path + "' not found");
									this.updateNodes(res.body);
							 }
						} else {
							 this.updateNodes([{
									nid: -1,
									nodeType: 1,
									path: path,
									date: 0,
									title: "error",
									showTitle: true,
									body: "",
									error: true
							 }]);
						}
				 }
			}.bind(this));
	 },


	 // New Node/Page has been fetched
	 updateNodes: function(receivedNodes) {

			var old_time = new Date();
			var nodes = _.clone(_data.nodes);

			// Remove node if Path exists within receivedNodes and replace with the new received node
			var existingNodes = _.filter(nodes, function(en, enk) {
				 var update = true;
				 _.forEach(receivedNodes, function (rn, rnk) {
						// en.error is to determine wether it has to be requeried due to errors.
						//console.log(rn);
						if((_.snakeCase(en.path) === _.snakeCase(rn.path)) && en.nid === -1) update = false;
				 });
				 return update;
			});


			_.forEach(receivedNodes, function (rn, rnk) {
				 existingNodes.push(rn)
			});

			_data.nodes = _.clone(existingNodes);
			var test = _.clone(_data);

			this.updateApp(test);

			var new_time = new Date();

			//console.log("%cupdateNodes: " + (new_time - old_time) + "ms", "color: blue");
			Actions.getDataRoute.completed();
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
				 return (_.kebabCase(n.path) === _.kebabCase(path)) && n.nid !== -1;
			});

			// Node doesn't exist, fetch it from server.
			if(_.isEmpty(nodeExists)) {
				 this.fetchNode(path);
			} else {
			// Node exists, show it.
				 console.log("path '/" + path + "' exists, displaying now");
				 Actions.getDataRoute.completed();
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
