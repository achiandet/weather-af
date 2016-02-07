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
  gulp.src('app/sass/**/*.scss')
  .pipe(plumber())
  .pipe(autoprefixer())
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(gulp.dest('app/scss'))
  .pipe(reload({stream:true}));
});


// //////////////////////////////////////////////
// Browser-Sync Task
// //////////////////////////////////////////////
gulp.task('browser-sync', function() {
  browserSync({
    server:{
      baseDir: "./app"
    }
  });
});


// //////////////////////////////////////////////
// Watch Task
// //////////////////////////////////////////////
gulp.task('watch', function() {
  gulp.watch('app/js/**/*.js', ['scripts']);
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/**/*.html', ['html']);
});


// //////////////////////////////////////////////
// Default Task - The task that calls all tasks
// //////////////////////////////////////////////
gulp.task('default', ['scripts', 'sass', 'html', 'browser-sync', 'watch']);
