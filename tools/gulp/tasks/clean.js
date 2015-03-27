module.exports = function(gulp, $) {

  gulp.task('clean:build', function( done ) {
    $.del([
      $.config.paths.build
    ], done);
  });

  gulp.task('clean:dist', function( done ) {
    $.del([
      $.config.paths.dist
    ], done);
  });

  // TODO: review

  gulp.task('clean', ['clean:dist', 'clean:build']);

};
