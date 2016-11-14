'use strict';


// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify')
var reload = browserSync.reload;


// -----------------------------------------------------------------------------
// SASS
// -----------------------------------------------------------------------------

gulp.task('sass', function () {
    return gulp.src(['./app/bower_components/bootstrap-sass-official/assets/stylesheets/bootstrap.scss', './app/styles/main.scss'])
        .pipe(sass())
        .pipe(gulp.dest('./app/css'));
});


// -----------------------------------------------------------------------------
// JavaScript
// -----------------------------------------------------------------------------

gulp.task('js', function () {
    return gulp.src([
        './app/bower_components/angular/angular.js',
        './app/bower_components/angular-translate/angular-translate.js',
        './app/bower_components/angular-translate-handler-log/angular-translate-handler-log.js',
        './app/bower_components/angular-cookies/angular-cookies.js',
        './app/bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
        './app/bower_components/angular-translate-storage-local/angular-translate-storage-local.js',
        './app/bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
        './app/js/app.js'])
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./app/js'));
});


// -----------------------------------------------------------------------------
// Watch Files & Reload
// -----------------------------------------------------------------------------

gulp.task('serve', function () {
    browserSync({
        server: {
            baseDir: "./app"
        }
    });

    gulp.watch(['./app/index.html'], [reload]);
    gulp.watch('./app/styles/**/*.scss', ['sass', reload]);
    gulp.watch('./app/scripts/**/*.js', ['js', reload]);
});


// -----------------------------------------------------------------------------
// Build
// -----------------------------------------------------------------------------

gulp.task('build', [], function () {
    runSequence('sass', 'js');
});


// -----------------------------------------------------------------------------
// Gulp Default
// -----------------------------------------------------------------------------

gulp.task('default', [], function () {
    gulp.start('serve');
});