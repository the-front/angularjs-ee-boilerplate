module.exports = function(gulp, $) {

  gulp.task('webserver:dev', ['styles'], function() {

    $.browserSync({
      port: $.config.webserver.port,
      server:[
        $.config.paths.src,
        $.config.paths.outputDir
      ]
    });

  });

  gulp.task('webserver:preview', function() {

    // https://www.npmjs.com/package/gulp-connect
    $.connect.server({
      port: $.config.webserver.port,
      root: [
        $.config.paths.outputDir
      ]
    });
    $.open('http://' + $.localip + ':' + $.config.webserver.port);

  });

};
