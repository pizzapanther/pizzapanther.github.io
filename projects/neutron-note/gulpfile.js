var gulp = require('gulp');

var concat = require("gulp-concat");
var less = require('gulp-less');
var rollup = require('gulp-rollup');
var buble = require('rollup-plugin-buble');

gulp.task('build-js', function () {
  var js_files = [
    "static/nnote/**/*.js",
  ];
  
  return gulp.src(js_files)
    .pipe(rollup({
      format: "iife",
      plugins: [buble()],
      entry: './static/nnote/app.js',
      globals: {
        "vue": 'Vue',
        "vue-router": 'VueRouter',
        "vue-material": 'VueMaterial',
      },
      external: ['vue', 'vue-router', 'vue-material']
    }))
    .pipe(gulp.dest("static/nnote-dist"));
});

gulp.task('build-css', function () {
  return gulp.src("static/nnote/**/*.less")
    .pipe(less({paths: ['static/less']}))
    .pipe(concat('app.css'))
    .pipe(gulp.dest("static/nnote-dist"));
});

var build_tasks = ['build-js', 'build-css'];

gulp.task('watch', build_tasks, function () {
  gulp.watch("static/nnote/**/*.js", ['build-js']);
  gulp.watch("static/**/*.less", ['build-css']);
});

gulp.task('default', build_tasks);

