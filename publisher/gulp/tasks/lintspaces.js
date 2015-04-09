module.exports = function(gulp, $) {

  // https://github.com/ck86/gulp-lintspaces

  var lintspacesStream = $.lazypipe()
    .pipe( $.cached, 'lintspaces' )
    .pipe( $.lintspaces, { editorconfig: '../.editorconfig' } )
    .pipe( $.lintspaces.reporter );

  //---

  gulp.task('lintspaces', function() {
    return gulp.src( $.config.lintspaces )
      .pipe( lintspacesStream() );
  });

};
