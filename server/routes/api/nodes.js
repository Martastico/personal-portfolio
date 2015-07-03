var express 	= require('express');
var router 		= express.Router();
var path 			= require("path");
var _ 				= require("lodash");
var mongoose 	= require('mongoose');


var _testBody = '';
var randomIDCounter = 999;

// Todo: Replace with Mongo DB
var indexBody = '<section class="gr top animation main_content">\n<section class="gc g12">\n<div class="default">\n<section id="personalCounter">\n<div class="item item-1 years personalcounter_item_1">\n<h2>5</h2>\n<div class="description"><span class="years-of">Years of </span><span class="experience">Experience</span></div>\n</div>\n<div class="item item-2 ideas personalcounter_item_2" >\n<h2>38</h2>\n<div class="description"><span>Ideas Per Day</span></div>\n</div>\n<div class="item item-3 creativity personalcounter_item_3" >\n<h2>&#8734;</h2>\n<div class="description"><span>Creativity</span></div>\n</div>\n<div class="item item-4 reasons personalcounter_item_4" >\n<h2>0</h2>\n<div class="description"><span>Reasons To Quit</span></div>\n</div>\n</section>\n</div>\n</section>\n</section>\n\n<section class="gr bottom" ref="index_gr">\n<section class="gc g12">\n<div class="default">\n<div id="youDeserveTheBest">\n<h1>I have passion for web.</h1>\n<h2>Here is what I can help with.</h2>\n</div>\n</div>\n</section>\n\n<section class="gc g12 no-spacing">\n<div class="index default">\n<div id="helpWith">\n<div class="design item">\n<div class="wrapper">\n<div class="header">\n<h1>Design</h1>\n<span class="description">From Ideas To Visual Layout</span>\n</div>\n<div class="content">\n<div class="body">\n<p>Do you have a great idea for the next website or application and you just want to be able to touch it? I can provide with a design that will work everywhere, be it phone, tablet, laptop, desktop or even TV.</p>\n<p>Web design includes many different specialities and diciplines. I try to balance everything as much as possible and come out with a result that will please you.</p>\n</div>\n<div class="tldr">\n\n<div class="header">\n<h2>tl;dr</h2>\n</div>\n<div class="items">\n<div class="item">\n<div class="header">\n<h2>User Experience</h2>\n</div>\n<ul>\n<li><span>Information Design</span></li>\n<li><span>Interaction Design</span></li>\n<li><span>Research</span></li>\n</ul>\n</div>\n<div class="item">\n<div class="header">\n<h2>User Interface</h2>\n</div>\n<ul>\n<li><span>Visual Design</span></li>\n<li><span>Usability</span></li>\n<li><span>Responsive</span></li>\n</ul>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n\n<div class="development item">\n\n<div class="wrapper">\n<div class="header">\n<h1>Development</h1>\n<span class="description">From Design To Functionality</span>\n</div>\n<div class="content">\n<div class="body">\n<p>The design and layout is right there... but you can&#39;t really do anything with it. Time to make it a reality and interactive!</p>\n<p>I&#39;m able to first create the concept quickly, to see how it will feels and looks like, using HTML, CSS, Javascript. Once everything looks and feels awesome, it&#39;s time to make it production ready and release it to the masses. To your requirements I will assure the functionality works on every device you need!</p>\n</div>\n<div class="tldr">\n\n<div class="header">\n<h2>tl;dr</h2>\n</div>\n<div class="items">\n<div class="item">\n<div class="header">\n<h2>Programming Skills</h2>\n</div>\n<ul>\n<li><span>HTML & CSS (SCSS)</span></li>\n<li><span>Javascript</span></li>\n<li><span>NodeJS, ReactJS</span></li>\n</ul>\n</div>\n<div class="item">\n<div class="header empty">\n<h2>&nbsp;</h2>\n</div>\n<ul>\n<li><span>Prototyping</span></li>\n<li><span>Unit Testing</span></li>\n<li><span>And More</span></li>\n</ul>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</section>\n</section>';
var aboutBody = '<section class="gr">\n\t<div class="gc g7">\n\t\t<h1 class="title2">Oh, hello there!</h1> \n\t\t<h2 class="line">I&#39;m the guy with passion for the web design & development.</h2>\n\t\t<p>My name is Mart. You can call me Mart, or Mr G. I was born and raised in Estonia, Tallinn. However, life led me away from there back in 2007, and now I reside in Finland, Helsinki.</p>\n\n\t\t<p>I&#39;ve been working as a freelance web designer since 2007, utilising the Adobe Creative Suits. However in 2010 I also got attached to developing, bringing the web design alive and interactive with HTML, CSS and Javascript.</p>\n\t\t\n\t\t<p>I&#39;m opend minded, hard working and always on the lookout for a new challenge or opportunity!</p>  \n\t</div>\n\t<div class="gc g5"><img src="/image/me.jpg" alt="Mart Saarman"/></div>\n</section>';

// Todo: replace with mongodb
var nodes = [
	 {
			NID: 1,
			date: 12,
			nodeType: 1,
			title: "I create stuff that makes you look good",
			showTitle: true,
			body: indexBody,
			path: 'home',
			style: {
				 name: "index"
			}
	 },
	 {
			NID: 2,
			nodeType: 1,
			title: "About Myself",
			showTitle: true,
			body: aboutBody,
			path: 'about'
	 },
	 {
			NID: 3,
			nodeType: 1,
			title: "Portfolio (Placeholder)",
			showTitle: true,
			body: 'Placeholder',
			path: 'portfolio'
	 },
	 {
			NID: 4,
			nodeType: 1,
			title: "Freebies (Placeholder)",
			showTitle: true,
			body: 'Placeholder',
			path: 'freebies'
	 },
	 {
			NID: 5,
			nodeType: 1,
			title: "Contact (Placeholder)",
			showTitle: true,
			body: 'Placeholder',
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


