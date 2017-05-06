var gulp = require('gulp');
var rollup = require('gulp-rollup');

gulp.task('build-js', function () {
  var js_files = [
    "static/bfish/**/*.js",
    "node_modules/neutron-graph/neutron-graph.js"
  ];
  
  return gulp.src(js_files)
    .pipe(sourcemaps.init())
    .pipe(rollup({
      "format": "iife",
      "plugins": [
        babel_rollup({
          "presets": [["es2015", { "modules": false }]],
          "plugins": ["external-helpers"]
        })
      ],
      entry: './static/bfish/app.js',
      globals: {
        "vue": 'Vue',
        "vue-router": 'VueRouter',
        "vue-material": 'VueMaterial',
      },
      external: ['vue', 'vue-router', 'vue-material'],
      sourceMap: true
    }))
    .pipe(gulp.dest("static/nlog-dist"));
});

//gulp.task('build-css', function () {
//  return gulp.src("static/bfish/**/*.less")
//    .pipe(less({paths: ['static/less']}))
//    .pipe(concat('app.css'))
//    .pipe(gulp.dest("static/bfish-dist"));
//});

var build_tasks = ['build-js'];

//gulp.task('watch', build_tasks, function () {
//  gulp.watch("static/bfish/**/*.js", ['build-js']);
//  gulp.watch("static/**/*.less", ['build-css']);
//});

gulp.task('default', build_tasks);

