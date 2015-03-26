module.exports = function(gulp, $) {

  gulp.task('webserver:dev', function() {

    // TODO: review
    /*
    $.browserSync({
      port: $.config.webserver.port,
      server:[
        $.config.paths.outputDir + '/docs/'
      ]
    });
    */

    $.log( 'TODO: define browserSync to dev flow' );

  });

  gulp.task('webserver:preview', function() {

    // TODO: define... use connect?
    $.log( 'TODO: define preview webserver... use connect?' );

  });

};
