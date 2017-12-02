var gulp = require('gulp');
var webserver = require('gulp-webserver');

var build_tasks = ['public', 'html', 'js', 'css'];

gulp.task('public', function () {
  gulp.src('public/**')
    .pipe(gulp.dest("build"));
});

gulp.task('html', function () {
  gulp.src('src/index.html')
    .pipe(gulp.dest("build"));
});

gulp.task('js', function () {
  
});

gulp.task('css', function () {
  
});
 
gulp.task('watch', build_tasks, function () {
  gulp.src('build')
    .pipe(webserver({
      livereload: true,
      open: false
    }));
});

gulp.task('default', build_tasks);
