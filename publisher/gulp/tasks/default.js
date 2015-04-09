module.exports = function(gulp, $) {

  gulp.task('run:flow', function(done) {

    var runTasks = [
      'validate',
    ];

    if( $.is.publish ) {

      runTasks = runTasks.concat([ 'publish' ]);

    } else if( $.is.init ) {

      // dev flow
      runTasks = runTasks.concat([ 'init' ]);

    }

    runTasks = runTasks.concat([ done ]);
    $.runSequence.apply(null, runTasks);

  });

  //---

  gulp.task('default', ['run:flow'], function() {

    $.projectInfoMsg();

  });

};
