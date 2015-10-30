var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    del = require('del'),
    plumber = require('gulp-plumber'),
    compass = require('gulp-compass');


var config = {
    styles: {
        scss: 'styles/scss',
        src: 'styles/**/*.scss',
        build: 'styles/css',
        all: 'styles.css'
    }
};

gulp.task('clean', function () {
    del.sync([config.styles.build]);
});

gulp.task('scss', function () {
    return gulp.src(config.styles.src)
        .pipe(plumber())
        .pipe(compass({
            css: config.styles.build,
            sass: config.styles.scss
        }))
        //.pipe(sass())
        .pipe(concat(config.styles.all))
        .pipe(gulp.dest(config.styles.build));
});


gulp.task('watch', function () {
    gulp.watch(config.styles.src, ['scss']);
});

gulp.task('build', ['clean', 'scss']);

gulp.task('default', ['build'], function() {
    gulp.start('watch');
});
