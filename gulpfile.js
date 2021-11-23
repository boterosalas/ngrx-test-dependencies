var gulp = require('gulp');
// var gzip = require('gulp-gzip');
var zlib = require('zlib');
const gulpBrotli = require('gulp-brotli');
var del = require('del');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify-es').default;

gulp.task('uglify', function () {
  return gulp.src(['./dist/**/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});


// gulp.task('compress', function () {
//   return gulp.src(['./dist/**/*.js', './dist/**/*.map']).pipe(gzip()).pipe(gulp.dest('./dist'));
// });

gulp.task('compress', function () {
  return gulp.src(['./dist/**/*.js', './dist/**/*.map']).pipe(gulpBrotli({
    params: {
      [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY,
    },
  })).pipe(gulp.dest('./dist'));
});

gulp.task('clean', function () {
  return del(['./dist/**/*.js', './dist/**/*.map' ,'!./dist']);
});

gulp.task('change', function() {
  return gulp.src(['./dist/**/*.br'])
      .pipe(rename(function (path) {
        path.basename = path.basename.replace('.js', '');
        path.basename = path.basename.replace('.js.map', '');
        path.basename = path.basename.replace('.map', '');
        path.extname = path.extname.replace('.br', '.js');
      }))
      .pipe(gulp.dest('./dist'));
});

gulp.task('cleangz', function () {
  return del(['./dist/**/*.br', '!./dist']);
});



