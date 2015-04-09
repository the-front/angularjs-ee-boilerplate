module.exports = function(gulp, $) {

  var jshintStream = $.lazypipe()
    .pipe( $.cached, 'jshint' )
    .pipe( $.jshint )
    .pipe( $.jshint.reporter, 'jshint-stylish' )
    .pipe( $.jshint.reporter, 'fail' );

  //---

  gulp.task('jshint', function() {
    return gulp.src( $.config.js )
      .pipe( jshintStream() );
  });

};
