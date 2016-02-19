module.exports = function(gulp, $) {

  gulp.task('run:flow', function(done) {

    var runTasks = [
      'clean',
      'validate',
    ];

    if( $.is.release ) {

      runTasks = runTasks.concat([ 'build' ]);

    } else if( $.is.preview ) {

      runTasks = runTasks.concat([ 'build', 'webserver:preview' ]);

    } else if( $.is.protractor || $.is.e2e ) {

      runTasks = runTasks.concat([
        'build',
        'webserver:preview',
        'protractor',
        'webserver:preview:exit'
      ]);

    } else {

      if( $.is.karma ) {
        runTasks = runTasks.concat([ 'karma:unit:single-run' ]);
      }

      // dev flow
      runTasks = runTasks.concat([ 'watch' ]);

    }

    runTasks = runTasks.concat([ done ]);
    $.runSequence.apply(null, runTasks);

  });

  //---

  gulp.task('default', ['run:flow'], function() {

    $.projectInfoMsg();

  });

};
