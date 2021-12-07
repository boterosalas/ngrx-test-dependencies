var gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
var webp = require('gulp-webp');
const svgmin = require('gulp-svgmin');

gulp.task('minify-html', () => {
  return gulp
    .src('./dist/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('picture', function () {
  return gulp.src('./dist/**/*.{png,jpg,jpeg,svg}').pipe(imagemin()).pipe(gulp.dest('./dist'));
});

gulp.task('webp', function () {
  return gulp.src('./dist/**/*.{png,jpg,jpeg}').pipe(webp()).pipe(gulp.dest('./dist'));
});

gulp.task('svgmin', () => {
  return gulp.src('./dist/**/*.svg').pipe(svgmin()).pipe(gulp.dest('./dist'));
});

gulp.task('performance', gulp.series('svgmin', 'minify-html', 'picture', 'webp'));
