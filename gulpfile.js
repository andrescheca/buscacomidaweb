var gulp = require('gulp');
var gutil = require('gulp-util');
var browserSync = require('browser-sync').create();
var stylus = require('gulp-stylus');

// Tarea por defecto
gulp.task('default', ['estilos'], function () {
  browserSync.init({
    server: {
      baseDir: './src'
    }
  });
  gulp.watch('src/estilos/*.styl', ['estilos']);
  gulp.watch('src/js/*.js').on('change', browserSync.reload);
  gulp.watch('src/*.html').on('change', browserSync.reload);
});

gulp.task('estilos', function () {
  gutil.log('Generando estilos...');
  return gulp.src('./src/estilos/*.styl')
    .pipe(stylus({
      'include_css': true
    }))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
})