module.exports = function(gulp, $) {

  gulp.task('watch', ['webserver:dev'], function() {

    // javascript project
    gulp.watch([
      $.config.js.project,
      '!' + $.config.paths.src + '/{app,shared}/*{,*/**}/tests/**/*'
    ], ['wf:js:project']);

    //---

    // html project
    gulp.watch([
      $.config.html.files,
      '!' + $.config.paths.src + '/vendor/**/*'
    ], ['wf:html:project']);

    //---

    // (less) stypes project
    gulp.watch([
      $.config.styles.less.project
    ], ['wf:styles:project']);

  });

  //---

  gulp.task('wf:bs:reload', function() {
    $.reload();
  });

  gulp.task('wf:js:project', function( done ) {

    $.runSequence(
      'jshint:project',
      'wf:bs:reload',
      done
    );

  });

  gulp.task('wf:html:project', function( done ) {

    $.runSequence(
      // 'jshint:project',
      'wf:bs:reload',
      done
    );

  });

  gulp.task('wf:styles:project', ['styles']);

};
