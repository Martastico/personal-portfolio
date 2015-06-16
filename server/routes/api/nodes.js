var express 	= require('express');
var router 		= express.Router();
var path 			= require("path");
var _ 				= require("lodash");
var mongoose 	= require('mongoose');


var _testBody = "<div class=\"regular\"> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores maxime minus sunt? Ad autautem, debitis delectus eius error esse est eveniet id illum impedit incidunt recusandaerepellat rerum sint. </p><h1>Hello</h1> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores maxime minus sunt? Ad autautem, debitis delectus eius error esse est eveniet id illum impedit incidunt recusandaerepellat rerum sint. </p><h1>Hello 2</h1> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores maxime minus sunt? Ad autautem, debitis delectus eius error esse est eveniet id illum impedit incidunt recusandaerepellat rerum sint. </p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus at cumque doloremque esse istenam qui quibusdam quo sequi similique?</p><p>Doloribus error laudantium maxime optio praesentium tempora veniam voluptatem. Amet dolore eligendiexcepturi facere itaque maiores praesentium saepe sed ut.</p><p>Amet aut autem deserunt doloribus hic, nihil pariatur perspiciatis quaerat unde! Adipisci doloreseaque id? Accusamus aperiam eveniet numquam quidem?</p><h1>Hello 3</h1> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores maxime minus sunt? Ad autautem, debitis delectus eius error esse est eveniet id illum impedit incidunt recusandaerepellat rerum sint. </p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus at cumque doloremque esse istenam qui quibusdam quo sequi similique?</p><p>Doloribus error laudantium maxime optio praesentium tempora veniam voluptatem. Amet dolore eligendiexcepturi facere itaque maiores praesentium saepe sed ut.</p><p>Amet aut autem deserunt doloribus hic, nihil pariatur perspiciatis quaerat unde! Adipisci doloreseaque id? Accusamus aperiam eveniet numquam quidem?</p><p>Doloribus error laudantium maxime optio praesentium tempora veniam voluptatem. Amet dolore eligendiexcepturi facere itaque maiores praesentium saepe sed ut.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aperiam assumenda atque aut consequatur doloremque dolorum ea, eligendi esse eveniet ex excepturi expedita facere fugiat ipsam, iure laborum libero maxime minus neque obcaecati praesentium quae quas tempora ullam! A accusamus adipisci aliquid cupiditate delectus dignissimos dolorem doloribus fugiat fugit, hic incidunt iste iusto maiores nihil numquam odio officia provident quaerat quas quibusdam, quidem quisquam recusandae unde velit voluptas voluptate voluptatum? Adipisci, aliquam cumque deserunt explicabo hic, incidunt itaque laboriosam officia optio quam quisquam sapiente temporibus ut veritatis vitae? Alias dolor dolorem enim ex fuga inventore iure nam nihil non possimus, quaerat qui quo soluta temporibus ullam, vero voluptate. Cumque ex recusandae rem sint. Dicta doloribus exercitationem illum laudantium nobis perspiciatis quisquam sapiente sunt ut veniam. Ab adipisci alias aspernatur, consequuntur cum delectus, deserunt dolorum ex facilis iure modi, quasi. A ad aperiam architecto aspernatur at autem consequuntur cum cupiditate debitis deserunt doloremque ducimus eaque eos, esse fuga illum impedit ipsa itaque iure laboriosam laborum modi nam numquam obcaecati pariatur, placeat quaerat quasi recusandae, repellendus repudiandae sapiente sed sequi voluptatem. Aut delectus dolores eius error necessitatibus nemo quae ratione reiciendis repellat, voluptas! Doloremque, inventore molestias nisi odit praesentium quas quos totam!</p><h1>Hello 4</h1> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores maxime minus sunt? Ad autautem, debitis delectus eius error esse est eveniet id illum impedit incidunt recusandaerepellat rerum sint. </p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus at cumque doloremque esse istenam qui quibusdam quo sequi similique?</p></div>";
var randomIDCounter = 999;

// Todo: replace with mongodb
var nodes = [
	 {
			NID: 1,
			date: 12,
			nodeType: 1,
			title: "I create stuff that makes you look good",
			showTitle: true,
			body: _testBody,
			path: 'home',
			style: {
				 name: "index"
			}
	 },
	 {
			NID: 2,
			nodeType: 1,
			title: "About",
			showTitle: true,
			body: 'Hello',
			path: 'about'
	 },
	 {
			NID: 3,
			nodeType: 1,
			title: "Portfolio",
			showTitle: true,
			body: 'Hello',
			path: 'portfolio'
	 },
	 {
			NID: 4,
			nodeType: 1,
			title: "Freebies",
			showTitle: true,
			body: 'Hello babi',
			path: 'freebies'
	 },
	 {
			NID: 5,
			nodeType: 1,
			title: "Contact",
			showTitle: true,
			body: 'Hello babi',
			path: 'contact'
	 }
];



router.get('/nodes', function(req, res, next) {
	 res.json(nodes)
});

router.get('/nodes/:path', function(req, res, next) {

	 var returnJSON = _.filter(nodes, function(en, enk) {
			return _.snakeCase(en.path) === _.snakeCase(req.params.path);
	 });

	 if(_.isEmpty(returnJSON)) {
			randomIDCounter++;
			res.status(404).json([
						 {
								NID: -1,
								nodeType: 1,
								title: "404 - Not Found | " + req.params.path,
								showTitle: true,
								body: "Page not found. It's possible the page has been removed.",
								path: req.params.path
						 }
					]
			)
	 } else {
			res.json(returnJSON)
	 }

});

module.exports = router;
