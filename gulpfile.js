var gulp = require('gulp');
var uglify = require('gulp-uglify-es').default;
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
var sourcemaps = require('gulp-sourcemaps');
const imagemin= require('gulp-imagemin');
var webp = require("gulp-webp");
const purgecss = require('gulp-purgecss');
const svgmin =  require('gulp-svgmin');

gulp.task('uglify', function () {
  return gulp.src(['./dist/**/*.js'])
        .pipe(uglify())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('minify-css', () => {
  return gulp.src(['./dist/**/*.css'])
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist'));
});

gulp.task('minify-html', () => {
  return gulp.src('./dist/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist'));
});

gulp.task("picture", function() {
  return gulp.src("./dist/**/*.{png,jpg,jpeg,svg}")
    .pipe(imagemin())
    .pipe(gulp.dest('./dist'));
});

gulp.task("webp", function() {
  return gulp.src("./dist/**/*.{png,jpg,jpeg}")
    .pipe(webp())
    .pipe(gulp.dest('./dist'));
});

gulp.task('purgecss', () => {
  return gulp.src('./dist/**/*.css')
      .pipe(purgecss({
          content: ['src/**/*.html']
      }))
      .pipe(gulp.dest('./dist'));
})

gulp.task('svgmin', () => {
  return gulp.src('./dist/**/*.svg')
      .pipe(svgmin())
      .pipe(gulp.dest('./dist'));
})

gulp.task("performance", gulp.series("uglify", "svgmin", "minify-css", "minify-html", "picture", "webp"));

