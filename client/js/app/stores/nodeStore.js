
var Reflux 	= require('reflux');
var Actions = require('../actions/actions.js');
var _ 			= require('lodash');

var NodesStore = require('../stores/nodeStore');

var _testBody = "<div class=\"regular\"> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores maxime minus sunt? Ad autautem, debitis delectus eius error esse est eveniet id illum impedit incidunt recusandaerepellat rerum sint. </p><h1>Hello</h1> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores maxime minus sunt? Ad autautem, debitis delectus eius error esse est eveniet id illum impedit incidunt recusandaerepellat rerum sint. </p><h1>Hello 2</h1> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores maxime minus sunt? Ad autautem, debitis delectus eius error esse est eveniet id illum impedit incidunt recusandaerepellat rerum sint. </p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus at cumque doloremque esse istenam qui quibusdam quo sequi similique?</p><p>Doloribus error laudantium maxime optio praesentium tempora veniam voluptatem. Amet dolore eligendiexcepturi facere itaque maiores praesentium saepe sed ut.</p><p>Amet aut autem deserunt doloribus hic, nihil pariatur perspiciatis quaerat unde! Adipisci doloreseaque id? Accusamus aperiam eveniet numquam quidem?</p><h1>Hello 3</h1> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores maxime minus sunt? Ad autautem, debitis delectus eius error esse est eveniet id illum impedit incidunt recusandaerepellat rerum sint. </p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus at cumque doloremque esse istenam qui quibusdam quo sequi similique?</p><p>Doloribus error laudantium maxime optio praesentium tempora veniam voluptatem. Amet dolore eligendiexcepturi facere itaque maiores praesentium saepe sed ut.</p><p>Amet aut autem deserunt doloribus hic, nihil pariatur perspiciatis quaerat unde! Adipisci doloreseaque id? Accusamus aperiam eveniet numquam quidem?</p><p>Doloribus error laudantium maxime optio praesentium tempora veniam voluptatem. Amet dolore eligendiexcepturi facere itaque maiores praesentium saepe sed ut.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aperiam assumenda atque aut consequatur doloremque dolorum ea, eligendi esse eveniet ex excepturi expedita facere fugiat ipsam, iure laborum libero maxime minus neque obcaecati praesentium quae quas tempora ullam! A accusamus adipisci aliquid cupiditate delectus dignissimos dolorem doloribus fugiat fugit, hic incidunt iste iusto maiores nihil numquam odio officia provident quaerat quas quibusdam, quidem quisquam recusandae unde velit voluptas voluptate voluptatum? Adipisci, aliquam cumque deserunt explicabo hic, incidunt itaque laboriosam officia optio quam quisquam sapiente temporibus ut veritatis vitae? Alias dolor dolorem enim ex fuga inventore iure nam nihil non possimus, quaerat qui quo soluta temporibus ullam, vero voluptate. Cumque ex recusandae rem sint. Dicta doloribus exercitationem illum laudantium nobis perspiciatis quisquam sapiente sunt ut veniam. Ab adipisci alias aspernatur, consequuntur cum delectus, deserunt dolorum ex facilis iure modi, quasi. A ad aperiam architecto aspernatur at autem consequuntur cum cupiditate debitis deserunt doloremque ducimus eaque eos, esse fuga illum impedit ipsa itaque iure laboriosam laborum modi nam numquam obcaecati pariatur, placeat quaerat quasi recusandae, repellendus repudiandae sapiente sed sequi voluptatem. Aut delectus dolores eius error necessitatibus nemo quae ratione reiciendis repellat, voluptas! Doloremque, inventore molestias nisi odit praesentium quas quos totam!</p><h1>Hello 4</h1> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores maxime minus sunt? Ad autautem, debitis delectus eius error esse est eveniet id illum impedit incidunt recusandaerepellat rerum sint. </p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus at cumque doloremque esse istenam qui quibusdam quo sequi similique?</p></div>";



var _data = {
	 nodeTypes: {
			1: {
				 NTID: 1,
				 name: "Page"
			}
	 },
	 nodes: [
			{
				 NID: 1,
				 date: 12,
				 nodeType: 1,
				 title: "I create stuff that makes you look good",
				 showTitle: true,
				 body: _testBody,
				 style: {
						name: "index"
				 }
			},
			{
				 NID: 2,
				 nodeType: 1,
				 title: "Hello Node Numero TWO",
				 showTitle: true,
				 body: 'Hello'
			},
			{
				 NID: 3,
				 nodeType: 1,
				 title: "Hello Node Numero THREEE!",
				 showTitle: true,
				 body: 'Hello'
			}
	 ]
};

var _fakeNodesFetch = [
	 {
			NID: 1,
			nodeType: 1,
			title: "I create stuff that makes you look good",
			showTitle: true,
			body: _testBody,
			style: {
				 name: "index"
			}
	 },
	 {
			NID: 4,
			nodeType: 1,
			title: "Hello Node Numero FOUR",
			showTitle: true,
			body: 'Hello babi'
	 },
	 {
			NID: 5,
			nodeType: 1,
			title: "Hello Node Numero FIEF",
			showTitle: true,
			body: 'Hello babi'
	 },
	 {
			NID: 6,
			nodeType: 1,
			title: "Hello Node Numero SEIX",
			showTitle: true,
			body: 'Hello babi'
	 }
];


module.exports = Reflux.createStore({
	 listenables: Actions,

	 getInitialState: function() {
			return _data;
	 },

	 fetchNode: function() {
			console.log("fetching node");
			// TODO: REplace with real query
			setTimeout(function() {
				 this.updateNodes(_fakeNodesFetch);
			}.bind(this), 100);
	 },

	 updateNodes: function(receivedNodes) {
			var old_time = new Date();
			var nodes = _.clone(_data.nodes);

			// Remove node if NID exists within receivedNodes and replace with the new received node
			var existingNodes = _.filter(nodes, function(en, enk) {
				 var update = true;
				 _.forEach(receivedNodes, function (rn, rnk) {
						if(en.NID === rn.NID) update = false;
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

	 // Perform a test to check wheter node exists, if not, fetch it.
	 doesNodeExist: function(State) {
			var NID = Number(_.clone(State.params.NID));
			console.log("Check if Node ID: " + NID + " Exists.");

			var nodeExists = _.filter(_data.nodes, function(n, nk) { return n.NID === NID; });

			// Node doesn't exist, fetch it from server.
			if(_.isEmpty(nodeExists)) this.fetchNode(NID);
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

