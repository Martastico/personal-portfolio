"use strict";

// I've just used single file setup, no reason to go crazy and separate everything, for now.

var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var minifycss = require('gulp-minify-css');
var sass = require('gulp-sass');
var gulp = require('gulp');
var notify = require("gulp-notify");
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var sourcemaps = require('gulp-sourcemaps');

// Locations
var PATHS = {
	 client: {
			dev: 'client/',
			dist: 'dist/client/'
	 }
};

function buildScript(file, watch) {
	 var props = {
			entries: ['app' + '/' + file],
			debug: false,
			cache: {},
			packageCache: {}
	 };
	 var bundler = watch ? watchify(browserify(props)) : browserify(props);
	 bundler.transform(reactify);
	 function rebundle() {
			var stream = bundler.bundle();
			return stream.on('error', console.log.bind(console))
					.pipe(source(file))
					.pipe(streamify(sourcemaps.init({loadMaps: true})))
						//	.pipe(streamify(uglify()))
						//	.pipe(source(file))
					.pipe(streamify(sourcemaps.write('./')))
					.pipe(gulp.dest(PATHS.client.dev + 'js'));
	 }
	 bundler.on('update', function() {
			rebundle();
			gutil.log('Rebundle...');
	 });
	 return rebundle();
}

//gulp.task('css-minify', function() {
//	return gulp.src(PATHS.client.dev + 'css/app.css')
//		.pipe(minifycss())
//		.pipe(gulp.dest(PATHS.client.dist + 'css/'));
//});

// Using Webstorm SASS File Watcher Instead

//gulp.task('sass', function () {
//	gulp.src(PATHS.client.dev + 'scss/**/*.scss')
//		.pipe(sass.sync().on('error', sass.logError))
//		.pipe(minifycss())
//		.pipe(gulp.dest(PATHS.client.dev + 'css/'));
//});

gulp.task('build', function () {
	 return buildScript('app.js', false);
});

gulp.task('default', ['build'], function() {
	 //gulp.watch(PATHS.client.dev + 'scss/**/*.scss', ['sass']);
	 return buildScript('app.js', true)
});