module.exports = function(gulp, $) {

  var requirejs = require('requirejs');

  function builder( config, done ) {
    requirejs( config, buildResponse, buildError );

    function buildResponse( response ) {
      if( $.is.debug ) {
        $.log( 'requirejs build done' );
        $.log( response );
      }
      done();
    }

    function buildError( error ) {
      $.log( 'requirejs build error' );
      $.log( error );
      done();
    }
  }

  //----------------------------------------------------------------------------

  /*
    http://tech.pro/blog/1639/using-rjs-to-optimize-your-requirejs-project

    http://requirejs.org/docs/optimization.html

    https://github.com/jrburke/r.js/blob/master/build/example.build.js

    https://github.com/CaryLandholt/AngularFun/blob/master/Gruntfile.coffee
  */

  // https://github.com/kvindasAB/angular-enterprise-kickstart/blob/master/Gruntfile.js#L303
  var requireBuildConfig = {
    baseUrl: $.config.paths.src, // TODO: change to build dir

    mainConfigFile: $.config.require.build,

    name: $.config.require.name,
    out: $.path.join( $.config.paths.dist, $.config.require.name + '.js' ),

    useStrict: true,
    wrap: {
      start: '(function() {\'use strict\';',
      end: '})();'
    },
    optimize: "uglify2",
    uglify2: {
      mangle:                 true,
      compress: {
        'drop_console':       true,
        'drop_debugger':      true,
        'dead_code':          true,
        'join_vars':          true,
        'if_return':          true,
        'negate_iife':        true,
        booleans:             true,
        loops:                true,
        unused:               true
      }
    }
  };

  //----------------------------------------------------------------------------

  gulp.task('requirejs', ['requirejs:rewrite-config'], function( done ) {
    // $.log( JSON.stringify(requireBuildConfig,null,2) );

    $.requirejs.builder( requireBuildConfig, done, $.is.debug, $.log );
  });

  //----------------------------------------------------------------------------

  // TODO: copy *.js files to .temp/ and cache html
  gulp.task('requirejs:rewrite-config', function() {
    return gulp.src( $.config.require.config )
      .pipe( $.requirejs.rewriteConfig() )
      .pipe( gulp.dest( $.config.paths.build ) );
  });

};
