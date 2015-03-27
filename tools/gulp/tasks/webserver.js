module.exports = function(gulp, $) {

  gulp.task('webserver:dev', function() {

    $.browserSync({
      port: $.config.webserver.port,
      server:[
        $.config.paths.src,
        $.config.paths.outputDir
      ]
    });

  });

  gulp.task('webserver:preview', function() {

    // TODO: define... use connect?
    $.log( 'TODO: define preview webserver... use connect?' );

  });

};
