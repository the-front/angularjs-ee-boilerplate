module.exports = function(gulp, $) {

  function defineRestContext() {
    return (
      $.config.webserver.proxy &&
      $.config.webserver.proxy.context
    ) ?
      $.config.webserver.proxy.context :
      'api';
  }

  function defineGenerateOptions() {
    return {
      destination: $.path.resolve( $.config.paths.src || 'src'),
      restContext: defineRestContext()
    };
  }

  gulp.task('generate', function( done ) {
    $.log( 'generate files from templates files...' );

    $.generate( defineGenerateOptions(), done );

  });

};
