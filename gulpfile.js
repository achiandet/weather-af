// //////////////////////////////////////////////
// Required Modules
// //////////////////////////////////////////////
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    del = require('del'),
    sass = require('gulp-sass');


// //////////////////////////////////////////////
// JS Tasks
// //////////////////////////////////////////////
gulp.task('scripts', function() {
  gulp.src(['app/js/**/*.js', '!app/js/**/*.min.js'])
  .pipe(rename({suffix: '.min'}))
  .pipe(uglify())
  .pipe(plumber())
  .pipe(gulp.dest('app/js'))
  .pipe(reload({stream:true}));

});


// //////////////////////////////////////////////
// HTML Task
// //////////////////////////////////////////////
gulp.task('html', function() {
  gulp.src('app/**/*.html')
  .pipe(reload({stream:true}));
});


// //////////////////////////////////////////////
// Sass Task
// //////////////////////////////////////////////
gulp.task('sass', function() {
  gulp.src('app/scss/**/*.scss')
  .pipe(plumber())
  .pipe(autoprefixer())
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(gulp.dest('app/css'))
  .pipe(reload({stream:true}));
});


// //////////////////////////////////////////////
// Browser-Sync Task
// //////////////////////////////////////////////
gulp.task('browser-sync', function() {
  browserSync({
    server:{
      baseDir: "./app/"
    }
  });
});

// Task to run build server for testing final app
gulp.task('build:serve', function() {
  browserSync({
    server:{
      baseDir: "./build/"
    }
  });
});


// //////////////////////////////////////////////
// Watch Tasks
// //////////////////////////////////////////////
gulp.task('watch', function() {
  gulp.watch('app/js/**/*.js', ['scripts']);
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/**/*.html', ['html']);
});


// //////////////////////////////////////////////
// Build Tasks
// //////////////////////////////////////////////

// clean out all of the files and folders from build folder
gulp.task('build:cleanfolder', function() {
  del([
    'build/**'
  ]);
});

// task to create build dir for all files
gulp.task('build:copy', ['build:cleanfolder'], function() {
  return gulp.src('app/**/*/')
  .pipe(gulp.dest('build/'));
});

// task to remove unwanted build files
gulp.task('build:remove', ['build:copy'], function(cb) {
  del([
    'build/scss/',
    'build/js/!(*.min.js)',
  ], cb);
});

gulp.task('build', ['build:copy', 'build:remove']);


// //////////////////////////////////////////////
// Default Task - The task that calls all tasks
// //////////////////////////////////////////////
gulp.task('default', ['scripts', 'sass', 'html', 'browser-sync', 'watch']);
