var gulp = require('gulp');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var compile_sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var webserver = require('gulp-webserver');


gulp.task('browsersync', function() {
    browserSync({
        server: {
            baseDir: './'
        },
        open: false,
        online: false,
        notify: false,
    });
});

gulp.task('compile_sass', function() {
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
        .pipe(gulp.dest('assets/css'));
});


gulp.task('uglify', function() {
    gulp.src('assets/js/*.js')
        .pipe(plumber())
        .pipe(uglify({
            mangle: true
        }))
        .pipe(gulp.dest('assets/minjs/main.js'));
    // gulp.src('assets/css/*.css')
    // .pipe(plumber())
    // .pipe(uglify())
    // .pipe(gulp.dest('assets/css'));
});

gulp.task('webserver', function () {
    gulp.src('./')
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
    //'browsersync',
    'webserver'
]);



gulp.task('watch', function() {
    gulp.watch('assets/js/*.js', ['uglify']);

    gulp.watch('assets/sass/**/*.sass', ['compile_sass']);

    // gulp.watch('**/*.*', ['browsersync']);
    gulp.watch('**/*.*', ['webserver']);
});

gulp.task('watch_sass', function() {
    gulp.watch('assets/sass/**/*.scss', ['compile_sass', 'webserver']);
});
