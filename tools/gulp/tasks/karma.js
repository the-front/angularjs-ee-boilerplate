module.exports = function(gulp, $) {

  /*
    Karma Runner 0.13+
    https://karma-runner.github.io/0.13/dev/public-api.html

    https://github.com/karma-runner/gulp-karma/commit/d3915b219290f5573e8c802e157bec18059b1d69
  */

  function onKarmaExecuted( code, done ) {
    if(code === 1) { // tests failed
      $.onError('karma: tests failed');
    } else if( code === 0 ) { // tests executed
      $.onSuccess('Karma: executed');
    }
    done();
  }

  function startKarma( config, done ) {
    function onKarmaDone( exitCode ){
      onKarmaExecuted( exitCode, done );
    }
    new $.karma
      .Server( config, onKarmaDone )
      .start();
  }

  //----------------------------------------------------------------------------

  gulp.task('karma:unit:single-run', function( done ) {
    startKarma( $.config.karma.unitSingleRun, done );
  });

  gulp.task('karma:reports', ['karma:unit:single-run']);

  gulp.task('karma:unit', function( done ) {
    startKarma( $.config.karma.unit, done );
  });

  gulp.task('karma:specs', function( done ) {
    startKarma( $.config.karma.specs, done );
  });

  gulp.task('karma:coverage', function( done ) {
    startKarma( $.config.karma.coverage, done );
  });

  gulp.task('karma:ci', function( done ) {
    startKarma( $.config.karma.ci, done );
  });

};
