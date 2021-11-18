var gulp = require('gulp');
var gzip = require('gulp-gzip');
var del = require('del');

gulp.task('compress', function () {
  return gulp.src(['./dist/*.js']).pipe(gzip()).pipe(gulp.dest('./dist'));
});

gulp.task('clean', function () {
  return del(['./dist/*.js', '!./dist']);
});
