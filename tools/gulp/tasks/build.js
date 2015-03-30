module.exports = function(gulp, $) {

  // TODO: review

  gulp.task('build', function( done ) {

    $.runSequence(
      // 'clean',
      [
        'copy:js2build',
        'styles',
        'build:min:index.html',
        'copy:vendor2dist'
      ],
      'html2js',
      'update:main:package.js',
      'requirejs',
      'build:concat:js',
      // TODO: review
      'clean:build',
      done
    );

  });

  gulp.task('build:min:index.html', function() {
    return gulp.src( $.config.html.index )
      .pipe( $.htmlmin( $.config.htmlmin ) )
      .pipe( gulp.dest( $.config.paths.dist ) );
  });

  gulp.task('build:concat:js', function() {
    return gulp.src([
        $.config.paths.build + '/' + $.config.require.name + '.js',
        $.config.require.config
      ])
      .pipe( $.concat( 'require.config.js' ) )
      .pipe( $.uglify() )
      .pipe( gulp.dest( $.config.paths.dist ) );
  });

};
