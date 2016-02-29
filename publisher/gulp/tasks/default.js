module.exports = function(gulp, $) {

  gulp.task('run:flow', function(done) {

    var runTasks = [
      'validate',
    ];

    if( $.is.publish ) {

      runTasks = runTasks.concat([ 'init', 'publish' ]);

    } else if( $.is.init ) {

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
