module.exports = function(gulp, $) {

  gulp.task('publish', function( done ) {

    $.runSequence(
      [
        'clean:repo-dir:content',
        'shell:tools-build'
      ],
      'copy:build2repo-dir',
      'shell:git:add',
      'shell:git:commit',
      [
        'shell:tools-clean',
        'shell:git:push'
      ],
      done
    );

  });

};
