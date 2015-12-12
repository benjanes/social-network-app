var source = require('vinyl-source-stream');
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var notify = require('gulp-notify');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var buffer = require('vinyl-buffer');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var historyApiFallback = require('connect-history-api-fallback');

/* styles task */
gulp.task('styles', function() {
  // compile the css
  gulp.src('css/styles.sass')
    .pipe(sass({
      includePaths: ['./node_modules/normalize-scss/sass/', './node_modules/susy/sass/']
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./build/css/'))
    .pipe(reload({stream : true}))
});

/* browser-sync task */
gulp.task('browser-sync', function() {
  browserSync({
    server : {},
    middleware : [historyApiFallback()],
    ghostMode : false // ghostMode links up dom interactions across open browser windows
  });
});

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);

  notify.onError({
    title : 'Compile Error',
    message : '<%= error.message %>'
  }).apply(this, args);

  this.emit('end');
}

function buildScript(file, watch) {
  var props = {
    entries : ['./scripts/' + file],
    debug : true,
    transform : [babelify.configure({presets : ['stage-0', 'es2015', 'react'] })]
  };

  var bundler = watch ? watchify(browserify(props)) : browserify(props);

  function rebundle() {
    var stream = bundler.bundle();
    return stream
      .on('error', handleErrors)
      .pipe(source(file))
      .pipe(gulp.dest('./build/'))
      .pipe(reload({stream : true}))
  }

  // listen for updates and run rebundle
  bundler.on('update', function() {
    rebundle();
    gutil.log('Rebundle...');
  });

  // run it first time buildScript is called
  return rebundle();
}

/* scripts task */
gulp.task('scripts', function() {
  return buildScript('main.js', false); // watch set to false, will only run once
});

/* default task */
gulp.task('default', ['styles', 'scripts', 'browser-sync'], function() {
  gulp.watch('css/**/*', ['styles']); // gulp watch for sass changes
  return buildScript('main.js', true); // browserify watch for js changes
});