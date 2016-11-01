"use strict"

var gulp = require('gulp');

var autoprefixer = require('gulp-autoprefixer');
var compile_sass = require('gulp-sass');
var del = require('del');
var jade = require('gulp-jade');
var ng_annotate = require('gulp-ng-annotate');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var webserver = require('gulp-webserver');

var paths = {
    production: 'docs'
};


gulp.task('compile_jade', function () {
    gulp.src('**/*.jade')
        .pipe(plumber())
        .pipe(jade())
        .pipe(gulp.dest(paths.production));
});


gulp.task('compile_sass', function () {
    gulp.src('assets/sass/**/*.sass')
        .pipe(plumber())
        .pipe(compile_sass({
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer({
            browsers: [
                '> 1%',
                'last 2 versions',
                'firefox >= 4',
                'safari 7',
                'safari 8',
                'IE 8',
                'IE 9',
                'IE 10',
                'IE 11'
            ],
            cascade: false
        }))
        .pipe(gulp.dest(paths.production + '/assets/css'));
});


gulp.task('duplicate_for_prod', ['duplicate_images', 'duplicate_res']);


gulp.task('clean_prod_folder', function () {
    del(paths.production + './**');
    del(paths.production + '/*.*');
});


gulp.task('duplicate_images', function () {
    gulp.src('assets/images/**/*.*')
        .pipe(plumber())
        .pipe(gulp.dest(paths.production + '/assets/images'));
    gulp.src('favicon.png')
        .pipe(plumber())
        .pipe(gulp.dest(paths.production));
});


gulp.task('duplicate_res', function () {
    gulp.src('assets/res/*.*')
        .pipe(plumber())
        .pipe(gulp.dest(paths.production + '/assets/res'));
});


gulp.task('uglify', function () {
    gulp.src('assets/js/*.js')
        .pipe(plumber())
        .pipe(ng_annotate())
        .pipe(uglify({
            mangle: true
        }))
        .pipe(rename(function (path) {
            path.basename += '.min';
        }))
        .pipe(gulp.dest(paths.production + '/assets/minjs'));
});

gulp.task('serve', function () {
    gulp.src('./' + paths.production)
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            open: true
        }))
        .pipe(plumber());
});



gulp.task('default', [
    'uglify',
    'compile_sass',
    'compile_jade',
    'duplicate_for_prod'
]);



gulp.task('watch', function () {
    gulp.watch('assets/js/*.js', ['uglify']);

    gulp.watch('assets/sass/**/*.sass', ['compile_sass']);

    gulp.watch('**/*.jade', ['compile_jade']);
});

gulp.task('watch_sass', function () {
    gulp.watch('assets/sass/**/*.scss', ['compile_sass']);
});