module.exports = function(gulp, $) {

  // TODO: review and redefine

  gulp.task('_watch_', ['browserSync'], function() {

    // javascript project
    gulp.watch([
      $.config.paths.src + '/{core,services}/*.js',
      $.config.paths.src + '/components/*/{*,/js/*}.js',
      '!' + $.config.paths.src + '/**/*.spec.js'
    ], ['wf:js:project']);

    // javascript docs
    gulp.watch([
      $.config.paths.docs + '/app/js/*.js',
      '!' + $.config.paths.docs + '/app/js/highlight.pack.js',
    ], ['wf:js:docs']);

    //---

    // stypes project
    gulp.watch([
      $.config.paths.src + '/**/*.scss'
    ], ['wf:styles:project']);

    // styles docs
    gulp.watch([
      $.config.paths.docs + '/app/css/*.css'
    ], ['wf:styles:docs']);

    //---

    // demos
    gulp.watch([
      $.config.paths.src + '/components/*/demo*/*',
    ], ['wf:demos']);

  });

  //---

  gulp.task('wf:bs:reload', function() {
    $.reload();
  });

  gulp.task('wf:js:project', function( done ) {

    $.runSequence(
      'build-js',
      'wf:js:docs:js',
      'wf:bs:reload',
      done
    );

  });

  gulp.task('wf:js:docs:app', function() {
    return $.streams.docs.app();
  });
  gulp.task('wf:js:docs:js', function() {
    return $.streams.docs.js();
  });

  gulp.task('wf:js:docs', function( done ) {

    $.runSequence(
      'jshint:docs',
      'wf:js:docs:app',
      'wf:js:docs:js',
      'wf:bs:reload',
      done
    );

  });

  gulp.task('wf:styles:project', ['sass'], function() {
    return $.streams.docs.css();
  });

  gulp.task('wf:styles:docs', function() {
    return $.streams.docs.css();
  });

  gulp.task('wf:demos', function( done ) {

    $.runSequence(
      'docs-demo-scripts',
      'wf:bs:reload',
      done
    );

  });

};
