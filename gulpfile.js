var gulp = require('gulp');
var notify = require('gulp-notify');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var sass = require('gulp-sass');
var eslint = require('gulp-eslint');
var gutil = require('gulp-util');

var path = {
  HTML: 'src/index.html',
  APP_OUT: 'build.js',
  DEST_BUILD: 'build',
  DEST_BUILD_APP: 'build/js',
  DEST_VENDOR: 'build/vendor',
  VENDOR_OUT: 'vendor.js',	
  APP_ENTRY_POINT: './src/js/App.jsx',
  SASS: 'src/sass/*.scss'
};

var externalDependencies = [
	'react',
	'react-dom',
	'jquery'
];

function appIsBundledLog(){
	gutil.log(gutil.colors.green('app is bundled'));
}

gulp.task('copyHtml', function(){
	gulp.src(path.HTML)
		.pipe(gulp.dest(path.DEST_BUILD))
		.pipe(notify(function(){
			console.log('index.html is copied');
		}));
});

gulp.task('lint', function(){
	return gulp.src(['src/js/*.jsx', '!node_modules/**'])
		.pipe(eslint())
		.pipe(eslint.format('compact', function(output){
			gutil.log(gutil.colors.bold.red(output));
		}));
		//.pipe(eslint.format());
});

gulp.task('watch', function() {
	gulp.watch(path.HTML, ['copyHtml']);
	gulp.watch('src/js/*.jsx', ['lint']);

	//Create browserify watcher that also transforms ES2015 and JSX to ES5
	var watcher = watchify(
		browserify({
		    entries: [path.APP_ENTRY_POINT],
		    debug: true,
		    cache: {}, packageCache: {}, fullPaths: true
		})
		.transform(babelify, {presets: ['es2015', 'react']})
	);

	//Set external dependecies for faster bundling
	watcher.external(externalDependencies);

	return watcher.on('update', function () {
		watcher.bundle()
			.on('error', function(err){
				gutil.beep();
				gutil.log(gutil.colors.bold.red(err.toString()));
			})
			.pipe(source(path.APP_OUT))
			//Extra error handler. Gulp sometimes crashes on my windows machine
			.on('error', function(err){
				gutil.beep();
				gutil.log(gutil.colors.bold.red(err.toString()));
			})
			.pipe(gulp.dest(path.DEST_BUILD_APP))
			.pipe(notify(appIsBundledLog));
	})
    .bundle()
    .pipe(source(path.APP_OUT))
    .pipe(gulp.dest(path.DEST_BUILD_APP))
    .pipe(notify(appIsBundledLog));
});

gulp.task('bundleVendors', function(){
	var vendorBundler = browserify({
		debug: true,
		require: externalDependencies
	});

	vendorBundler.bundle()
		.pipe(source(path.VENDOR_OUT))
		.pipe(gulp.dest(path.DEST_VENDOR))
		.pipe(notify(function(){
			gutil.log(gutil.colors.green('vendors are bundled'));
		}));
});

/*Sass compilation*/
gulp.task('sassCompilation', function(){
	gulp.src(path.SASS)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./build/css/'))
		.pipe(notify(function(){
			gutil.log(gutil.colors.green('sass files are compiled'));
		}));;
});

gulp.task('watchSass', function(){
	gulp.watch(path.SASS, ['sassCompilation']);
});

gulp.task('default', ['watch', 'bundleVendors', 'watchSass']);