
var Reflux 			= require('reflux');
var Actions 		= require('../actions/actions.js');
var _ 					= require('lodash');
var request 		= require('superagent');

// Config
var Config 		= require('../app.config');

// Stores
var NodesStore 	= require('../stores/nodeStore');



var _data = {
	 nodeTypes: {
			1: {
				 NTID: 1,
				 name: "Page"
			}
	 },
	 nodes: []
};


module.exports = Reflux.createStore({
	 listenables: Actions,

	 getInitialState: function() {
			return _data;
	 },

	 fetchNode: function(path) {
			console.log("fetching node");
			console.log(path);
			// TODO: REplace with real query
			request.get(Config.path.api + '/nodes/' + path).end(function(err, res) {
				 if(!err) {
						// Success
						this.updateNodes(res.body);
				 } else {
						// Handle Errors
						// todo: more robust
						// If there's an error, an NID -1 is created with the path provided.
						// So when going back to same path it will retry to get the node.
						if(!_.isUndefined(res)) {
							 if(res.status === 404) {
									console.log("404");
									this.updateNodes(res.body);
							 }
						} else {
							 var title = "Unknown error";
							 var body = "An unknown error has occured. Please try again later.";
							 this.updateNodes([{
									NID: -1,
									nodeType: 1,
									path: path,
									title: title,
									showTitle: true,
									body: body,
									error: true
							 }]);
						}
				 }
			}.bind(this));
	 },


	 updateNodes: function(receivedNodes) {
			console.log("updateNodes");

			var old_time = new Date();
			var nodes = _.clone(_data.nodes);

			// Remove node if Path exists within receivedNodes and replace with the new received node
			var existingNodes = _.filter(nodes, function(en, enk) {
				 var update = true;
				 _.forEach(receivedNodes, function (rn, rnk) {
						// en.error is to determine wether it has to be requeried due to errors.
						if((_.snakeCase(en.path) === _.snakeCase(rn.path)) && en.NID === -1) update = false;
				 });
				 return update;
			});


			_.forEach(receivedNodes, function (rn, rnk) {
				 existingNodes.push(rn)
			});

			_data.nodes = _.clone(existingNodes);

			this.updateApp();

			var new_time = new Date();

			console.log("%cupdateNodes: " + (new_time - old_time) + "ms", "color: blue");
			Actions.getDataRoute.completed();
	 },

	 // Perform a test to check wheter node exists, if not,  fetch it.
	 doesNodeExist: function(State) {
			var path = State.params.path;
			if(_.isUndefined(path)) {
				 path = "home";
			}
			console.log("Check if Node ID: " + path + " Exists.");

			// If empty, fetch node from server.
			var nodeExists = _.filter(_data.nodes, function(n, nk) {
				 return (_.kebabCase(n.path) === _.kebabCase(path)) && n.NID !== -1;
			});

			console.log("Exists: " + !_.isEmpty(nodeExists));
			// Node doesn't exist, fetch it from server.
			if(_.isEmpty(nodeExists)) this.fetchNode(path);

			// Node exists, show it.
			else Actions.getDataRoute.completed();

	 },

	 onGetDataRoute: function(name, State) {
			console.log("getDataRoute: " + name);
			if(name === "node") {
				 this.doesNodeExist(State);
			}
	 },

	 updateApp: function() {
			this.trigger(_.cloneDeep(_data));
	 }

});
