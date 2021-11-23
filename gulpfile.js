var gulp = require('gulp');
var gzip = require('gulp-gzip');
var del = require('del');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify-es').default;

gulp.task('uglify', function () {
  return gulp.src(['./dist/**/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});


gulp.task('compress', function () {
  return gulp.src(['./dist/**/*.js', './dist/**/*.map']).pipe(gzip()).pipe(gulp.dest('./dist'));
});

gulp.task('clean', function () {
  return del(['./dist/**/*.js', './dist/**/*.map' ,'!./dist']);
});

gulp.task('change', function() {
  return gulp.src(['./dist/**/*.gz'])
      .pipe(rename(function (path) {
        path.extname = path.extname.replace('.gz', '.js');
        path.extname = path.extname.replace('.gz', '.map');
      }))
      .pipe(gulp.dest('./dist'));
});

gulp.task('cleangz', function () {
  return del(['./dist/**/*.gz', '!./dist']);
});



