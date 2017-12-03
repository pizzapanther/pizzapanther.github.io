var gulp = require('gulp');
var plumber = require('gulp-plumber');
var concat = require("gulp-concat");
var addsrc = require('gulp-add-src');

var webserver = require('gulp-webserver');

var rollup = require('rollup').rollup;
var buble = require('rollup-plugin-buble');
var resolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');

var less = require('gulp-less');

var nunjucks = require('gulp-nunjucks');

var build_tasks = ['public', 'html', 'js', 'css'];

gulp.task('public', function () {
  var public_files = [
    'public/**',
    'node_modules/vue/d*/**',
    'node_modules/vue-material/d*/**'
  ];
  gulp.src(public_files)
    .pipe(gulp.dest("build"));
});

gulp.task('html', function () {
  var v = process.env.HEROKU_RELEASE_VERSION || Date.now();
  
  gulp.src('src/index.html')
    .pipe(nunjucks.compile({v: v}))
    .pipe(gulp.dest("build"));
});

gulp.task('js', function () {
  return rollup({
    input: './src/index.js',
    plugins: [
      resolve({ jsnext: true }),
      commonjs(),
      buble({transforms: { forOf: false }})
    ],
    external: ['vue', 'vue-material']
  }).then(function (bundle) {
    return bundle.write({
      format: 'iife',
      file: './build/index.js',
      globals: {
        "vue": 'Vue',
        "vue-material": 'VueMaterial'
      },
    });
  });
});

gulp.task('css', function () {
  return gulp.src("src/**/*.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(addsrc('node_modules/vue-material/dist/vue-material.css'))
    .pipe(concat('index.css'))
    .pipe(gulp.dest("build"));
});
 
gulp.task('watch', build_tasks, function () {
  gulp.watch("src/**", ['public']);
  gulp.watch("src/**/*.html", ['html']);
  gulp.watch("src/**/*.js", ['js']);
  gulp.watch("src/**/*.less", ['css']);
  
  gulp.src('build')
    .pipe(webserver({
      livereload: true,
      open: false,
      host: '0.0.0.0'
    }));
});

gulp.task('default', build_tasks);
