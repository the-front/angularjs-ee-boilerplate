module.exports = function(gulp, $) {

  gulp.task('run:flow', function(done) {

    var runTasks = [
      'jshint',
      'clean:dist',
    ];

    if( $.is.release ) {

      // dist flow

      // TODO: review and redefine [ build flow ]
      // runTasks = runTasks.concat([ 'clean:dist:unused-files' ]);

      if( $.is.preview ) {
        runTasks = runTasks.concat([ 'webserver:preview' ]);
      }

    } else {

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
