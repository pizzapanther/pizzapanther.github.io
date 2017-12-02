var gulp = require('gulp');
var webserver = require('gulp-webserver');

var build_tasks = ['build-html', 'build-js', 'build-css'];

gulp.task('build-html', function () {
  gulp.src('src/index.html')
    .pipe(gulp.dest("build"));
});

gulp.task('build-js', function () {
  
});

gulp.task('build-css', function () {
  
});
 
gulp.task('watch', build_tasks, function () {
  gulp.src('build')
    .pipe(webserver({
      livereload: true,
      open: false
    }));
});

gulp.task('default', build_tasks);
