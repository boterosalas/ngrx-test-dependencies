var gulp = require('gulp');
var gzip = require('gulp-gzip');
var del = require('del');

gulp.task('compress', function () {
  return gulp.src(['./dist/**/*.*']).pipe(gzip()).pipe(gulp.dest('./dist'));
});

gulp.task('clean', function () {
  return del(['./dist/*.js', './dist/*.css' ,'./dist/*.jpg', './dist/*.png', './dist/*.gif','./dist/*.json', './dist/*.ttf', './dist/*.html', './dist/*.svg', './dist/*.map', './dist/*.eot', './dist/*.woff','./dist/*.woff2', '!./dist']);
});
