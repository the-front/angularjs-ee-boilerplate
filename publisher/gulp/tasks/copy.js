module.exports = function(gulp, $) {

  gulp.task('copy:build2repo-dir', function() {
    return gulp.src( $.config.paths.build + '/**/*' )
      .pipe( gulp.dest( $.config.paths.repoDir ) );
  });

};
