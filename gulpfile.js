var concat = require('gulp-concat');
var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('default', function () {
    return gulp.src(['./app/web/js/jquery-2.1.1.min.js', './app/web/js/materialize.min.js', './app/web/client.bundle.js'])
        .pipe(concat({ path: './app/web/production.js' }))
        .pipe(uglify())
        .pipe(gulp.dest('./'));
});

