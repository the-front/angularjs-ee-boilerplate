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

    } else if( $.is.e2e ) {

      runTasks = runTasks.concat([
        'build',
        'webserver:preview',
        'protractor',
        'webserver:exit'
      ]);

    } else if(
      $.is.protractor &&
      $._.isString($.args.protractor) &&
      $._.isObject($.config.protractor) &&
      $._.isObject($.config.protractor.tests) &&
      $._.isArray($.config.protractor.tests.suites) &&
      $._.find($.config.protractor.tests.suites, {name: $.args.protractor})
    ) {

      runTasks = runTasks.concat([
        'webserver:protractor',
        'protractor:suite:' + $.args.protractor,
        'webserver:exit'
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
