module.exports = function(gulp, $) {

  gulp.task('watch', ['webserver:dev'], function() {

    // javascript project
    gulp.watch( $.config.js.project.watch, ['wf:js'] );

    //---

    // html project
    gulp.watch([
      $.config.html.files,
      '!' + $.config.paths.src + '/vendor/**/*'
    ], ['wf:html']);

    //---

    // stypes project
    var watchStyles;

    if( $.is.sass ) {
      watchStyles = $.config.styles.sass.project;
    } else {
      watchStyles = $.config.styles.less.project;
    }

    gulp.watch([
      watchStyles
    ], ['wf:styles']);

  });

  //---

  gulp.task('wf:bs:reload', function() {
    $.reload();
  });

  gulp.task('wf:js', function( done ) {

    var runTasks = [
      ['jshint:project', 'lintspaces:js']
    ];

    if( $.is.karma ) {
      runTasks.push( 'karma:unit:single-run' );
    }

    runTasks = runTasks.concat([
      'wf:bs:reload',
      done
    ]);

    $.runSequence.apply(null, runTasks);

  });

  gulp.task('wf:html', function( done ) {

    $.runSequence(
      'lintspaces:html',
      'wf:bs:reload',
      done
    );

  });

  gulp.task('wf:styles', function( done ) {

    $.runSequence(
      'lintspaces:styles',
      'styles',
      done
    );

  });

};
