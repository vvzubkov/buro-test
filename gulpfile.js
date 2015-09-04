/**
 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 обьявляем переменные и зависимости
 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 */

var gulp            = require('gulp'),
    jade            = require('gulp-jade'),
    sass            = require('gulp-sass'),
    minifyCSS       = require('gulp-minify-css'),
    autoprefixer    = require('gulp-autoprefixer'),
    uglify          = require('gulp-uglify'),
    prettify        = require('gulp-prettify'),
    browserSync     = require('browser-sync'),
    reload          = browserSync.reload,
    config          = require('./config'),
    runSequence     = require('run-sequence'),
    htmlmin         = require('gulp-htmlmin'),
    concat          = require('gulp-concat'),
    rename          = require('gulp-rename'),
    sourcemaps      = require('gulp-sourcemaps'),
    autoPreFixer    = require('gulp-autoprefixer'),
    clean           = require('gulp-clean');

gulp.task('browser-sync', function () {
    browserSync(config.browserSync.development);
});

gulp.task('browser:reload', function () {
    browserSync.reload();
});

gulp.task('clean:html', function () {
    return gulp.src('./public/**/*.html', {read: false})
        .pipe(clean());
});

gulp.task('clean:css', function () {
    return gulp.src('./public/**/*.css', {read: false})
        .pipe(clean());
});

gulp.task('clean:js', function () {
    return gulp.src('./public/**/*.js', {read: false})
        .pipe(clean());
});

gulp.task('clean:map', function () {
    return gulp.src('./public/**/*.map', {read: false})
        .pipe(clean());
});

gulp.task('clean', function (callback) {
    runSequence(
        'clean:html',
        'clean:css',
        'clean:js',
        'clean:map',
        callback);
});

gulp.task('jade', function () {
    gulp.src(config.jade.src)
        .pipe(jade({pretty: true}))
        .on('error', console.log)
        .pipe(prettify({
            indent_size: 4,
            unformatted: ['pre', 'code']
        }))
        .pipe(gulp.dest(config.jade.dest))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('sass', function () {
    gulp.src(config.concat.css.links)
        .pipe(sourcemaps.init())
        .pipe(sass(config.sass.options))
        .pipe(autoPreFixer(config.autoPreFixer))
        .pipe(concat('style.min.css'))
        .pipe(minifyCSS())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.concat.css.dest));
});

gulp.task('concat:js', function () {
    return gulp.src(config.concat.js.links)
        .pipe(sourcemaps.init())
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.concat.js.dest));
});

gulp.task('watch:sass', function (callback) {
    runSequence(
        'sass',
        'browser:reload',
        callback);
});

gulp.task('watch:js', function (callback) {
    runSequence(
        'concat:js',
        'browser:reload',
        callback);
});

gulp.task('watch:jade', function (callback) {
    runSequence(
        'jade',
        'browser:reload',
        callback);
});

gulp.task('build:production', function (callback) {
    runSequence(
        'clean',
        'jade',
        'sass',
        'concat:js',
        'browser-sync',
        'watch',
        callback);
});

gulp.task('watch', function () {
    gulp.watch('./scss/**/*.scss', ['watch:sass']);
    gulp.watch('./lib/**/*.js', ['watch:js']);
    gulp.watch('./views/**/*.jade', ['watch:jade']);
});

gulp.task('default', ['build:production']);
