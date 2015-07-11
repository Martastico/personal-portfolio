var express 	= require('express');
var router 		= express.Router();
var path 			= require("path");
var _ 				= require("lodash");


var _testBody = '';
var randomIDCounter = 999;

// Todo: Replace with Mongo DB
var indexBody = '<section class="gr top animation main_content">\n<section class="gc g12">\n<div class="default">\n<section id="personalCounter">\n<article class="item item-1 years personalcounter_item_1">\n<span class="number">5</span>\n<div class="description"><span class="years-of">Years of </span><span class="experience">Experience</span></div>\n</article>\n<article class="item item-2 ideas personalcounter_item_2" >\n<span class="number">38</span>\n<div class="description"><span>Ideas Per Day</span></div>\n</article>\n<article class="item item-3 creativity personalcounter_item_3" >\n<span class="number">&#8734;</span>\n<div class="description"><span>Creativity</span></div>\n</article>\n<article class="item item-4 reasons personalcounter_item_4" >\n<span class="number">0</span>\n<div class="description"><span>Reasons To Quit</span></div>\n</article>\n</section>\n</div>\n</section>\n</section>\n\n<section class="gr bottom" ref="index_gr">\n<section class="gc g12">\n<div class="default">\n<div id="youDeserveTheBest">\n<h1>I have passion for web.</h1>\n<span>Here is what I can help with.</span>\n</div>\n</div>\n</section>\n\n<section class="gc g12 no-spacing">\n<div class="index default">\n<div id="helpWith">\n<div class="design item">\n<div class="wrapper">\n<div class="header">\n<h1>Design</h1>\n<h2 class="h2">From Ideas To Visual Layout</h2>\n</div> \n<div class="content"> \n<div class="body">\n<p>Do you have a great idea for the next website or application and you just want to be able to touch it? I can provide with a design that will work everywhere, be it phone, tablet, laptop, desktop or even TV.</p>\n<p>Web design includes many different specialities and diciplines. I try to balance everything as much as possible and come out with a result that will please you.</p>\n</div>\n<div class="tldr">\n\n<div class="header">\n<h2>tl;dr</h2>\n</div>\n<div class="items">\n<div class="item">\n<div class="header">\n<h2>User Experience</h2>\n</div>\n<ul>\n<li><span>Information Design</span></li>\n<li><span>Interaction Design</span></li>\n<li><span>Research</span></li>\n</ul>\n</div>\n<div class="item">\n<div class="header">\n<h2>User Interface</h2>\n</div>\n<ul>\n<li><span>Visual Design</span></li>\n<li><span>Usability</span></li>\n<li><span>Responsive</span></li>\n</ul>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n\n<div class="development item">\n\n<div class="wrapper">\n<div class="header">\n<h1>Development</h1> \n<h2 class="description">From Design To Functionality</h2>\n</div>\n<div class="content">\n<div class="body">\n<p>The design and layout is right there... but you can&#39;t really do anything with it. Time to make it a reality and interactive!</p>\n<p>I&#39;m able to first create the concept quickly, to see how it will feels and looks like, using HTML, CSS, Javascript. Once everything looks and feels awesome, it&#39;s time to make it production ready and release it to the masses. To your requirements I will assure the functionality works on every device you need!</p>\n</div>\n<div class="tldr">\n\n<div class="header">\n<h2>tl;dr</h2>\n</div>\n<div class="items">\n<div class="item">\n<div class="header">\n<h2>Programming Skills</h2>\n</div>\n<ul>\n<li><span>HTML & CSS (SCSS)</span></li>\n<li><span>Javascript</span></li>\n<li><span>NodeJS, ReactJS</span></li>\n</ul>\n</div>\n<div class="item">\n<div class="header empty">\n<h2>&nbsp;</h2>\n</div>\n<ul>\n<li><span>Prototyping</span></li>\n<li><span>Unit Testing</span></li>\n<li><span>And More</span></li>\n</ul>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</section>\n</section>';
var aboutBody = '<section class="gr">\n\t<div class="gc g12">\n\t\t<h1 class="title2">Oh, hello there!</h1>\n\t\t<h2 class="redcolor line">I&#39;m the guy with passion for the web design & development.</h2>\n\n\t\t<img src="/image/me.jpg" class="me-pic" alt="Mart Saarman"/> \n\t\t<p class="sizem">My name is Mart. You can call me Mart, or Mr G. I was born and raised in Estonia, Tallinn. However, life led me away from there back in 2007, and now I reside in Finland, Helsinki.</p>\n\n\t\t<p>I&#39;ve been working as a freelance web designer since 2007, utilising the Adobe Creative Suits. However in 2010 I also got attached to developing, bringing the web design alive and interactive with HTML, CSS and Javascript.</p>\n\t\t<p>When I&#39;m not coloring pixels or coding the matrix, you can find me at f football field shooting few goals or just nibbling grass around Helsinki. Also not to brag or anything but I can cook 1 minute meal in 56 seconds.</p>\n\n\t\t<div class="text-box">\n\t\t\t<p>I&#39;m open minded, hard working and always on the lookout for a new challenge or opportunity!</p>\n\t\t</div> \n\t</div>\n</section>\n<section class="gr">\n\t<div class="gc g12">\n\t\t<h1>Technical Skills</h1>\n\t</div>\n</section>\n<section class="gr"> \n\t<div class="gc g6">\n\t\t<div class="skills-list">\n\t\t\t<h3>Coding</h3>\n\t\t\t<ul>\n\t\t\t\t<li>HTML5 & CSS3</li>\n\t\t\t\t<li>\n\t\t\t\t\tJavascript, including:\n\t\t\t\t\t<ul>\n\t\t\t\t\t\t<li>ReactJS & Flux/Reflux</li>\n\t\t\t\t\t\t<li>AngularJS</li>\n\t\t\t\t\t\t<li>NodeJS</li>\n\t\t\t\t\t\t<li>Socket.IO</li>\n\t\t\t\t\t\t<li>Promises</li>\n\t\t\t\t\t\t<li>Highcharts</li>\n\t\t\t\t\t</ul>\n\t\t\t\t</li>\n\t\t\t\t<li>REST API Development</li>\n\t\t\t</ul>\n\t\t</div>\n\t\t<div class="skills-list">\n\t\t\t<h3>Designing Tools</h3>\n\t\t\t<ul>\n\t\t\t\t<li>Adobe Photoshop</li>\n\t\t\t\t<li>Adobe Illustrator</li>\n\t\t\t</ul>\n\t\t</div>\n\t\t<div class="skills-list">\n\t\t\t<h3>Various</h3>\n\t\t\t<ul>\n\t\t\t\t<li>Broad Knowledge of the following OS systems: Windows, Mac OSX and Linux</li>\n\t\t\t\t<li>Computer hardware assembly and fixing</li>\n\t\t\t\t<li>Computer diagnostics</li>\n\t\t\t\t<li>First-aid (Red Cross)</li>\n\t\t\t\t<li>Prepare one minute meal in 56 seconds</li>\n\t\t\t</ul>\n\t\t</div>\n\t</div>\n\t<div class="gc g6">\n\t\t<div class="skills-list">\n\t\t\t<h3>Other</h3>\n\t\t\t<ul>\n\t\t\t\t<li>Drupal CMS Design & Development</li>\n\t\t\t\t<li>User Interface and User Experience Design</li>\n\t\t\t\t<li>Mobile and Tablet Optimization (Responsive)</li>\n\t\t\t\t<li>WWW-Services Deployment (server-side)</li>\n\t\t\t\t<li>SEO (Search Engine Optimization)</li>\n\t\t\t\t<li>Bootstrap</li>\n\t\t\t\t<li>Foundation</li>\n\t\t\t\t<li>SCSS +Compass</li>\n\t\t\t</ul>\n\t\t</div>\n\t\t<div class="skills-list">\n\t\t\t<h3>Software Knowledge</h3>\n\t\t\t<ul>\n\t\t\t\t<li>Excel</li>\n\t\t\t\t<li>Office</li>\n\t\t\t\t<li>Powerpoint</li>\n\t\t\t\t<li>Jetbrains Webstorm</li>\n\t\t\t\t<li>Autodesk Maya (Basic)</li>\n\t\t\t</ul>\n\t\t</div>\n\t</div>\n</section>';

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
			},
			meta: {
				 title: "Front-End Web Developer and Designer, including Javascript",
				 description: "A personal website of Mart Saarman, a Front-End Web Developer & Designer specialising in Javascript with various libraries and frameworks. Finland, Helsinki."
			}
	 },
	 {
			NID: 2,
			nodeType: 1,
			title: "A little bit about myself",
			showTitle: true,
			body: aboutBody,
			path: 'about',
			meta: {
				 title: "About | Front-End Web Developer and Designer from Finland",
				 description: "A little about Mart Saarman and his technical skills. Including Javascript, ReactJS, AngularJS and NodeJS"
			}
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
			res.setHeader("Cache-Control", "public, max-age=604800000");
			res.json(returnJSON)
	 }

});

module.exports = router;


