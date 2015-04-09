module.exports = function(gulp, $) {

  gulp.task('init', function( done ) {

    $.runSequence(
      'clean:repo-dir',
      'shell:createRepoDir',
      'shell:git:clone',
      'shell:git:checkout',
      done
    );

  });

};
