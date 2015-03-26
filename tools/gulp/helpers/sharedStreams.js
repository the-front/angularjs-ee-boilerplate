var gulp      = require('gulp');
var $         = require('./$');

var fs        = require('fs');
var glob      = require('glob').sync;

// shared streams to gulp tasks
var streams = $.streams = {};

// TODO: review

//---

streams.autoprefix = function() {
  return $.autoprefixer( $.config.autoprefixer );
};

//---

/**
 * Builds the entire component library javascript.
 * @param {boolean} isRelease Whether to build in release mode.
 */
streams.buildJS = function( isRelease ) {

  isRelease = isRelease || $.is.release;

  $.log("building js files...");

  var jsBuildStream = gulp
    .src(
      $.config
        .js.project
        .base.concat([
          $.path.join( $.config.glob.paths, '*.js')
        ])
    )
    .pipe( $.utils.filterNonCodeFiles() )
    .pipe( $.utils.buildNgDefinition() )
    .pipe( $.plumber() )
    .pipe( $.ngAnnotate() );

  var themeBuildStream = gulp
    .src(
      $.config
        .styles.project
        .base.theme.concat([
          $.path.join( $.config.glob.paths, '*-theme.scss' )
        ])
    )
    .pipe( $.concat('default-theme.scss') )
    .pipe( $.utils.hoistScssVariables() )
    .pipe( $.if( $.is.debug, $.debug() ) )
    .pipe( $.sass({ onError: $.onError }) )
    .pipe( gulp.dest( $.config.paths.outputDir ) )
    .pipe( $.utils.cssToNgConstant( $.pkg.ngPackage + '.core', '$MD_THEME_CSS') );

  var jsReleaseStream = $.lazypipe()
    .pipe( $.uglify, { preserveComments: 'some' } )
    .pipe( $.rename, { suffix: '.min' } )
    .pipe( gulp.dest, $.config.paths.outputDir );


  return $.series( jsBuildStream, themeBuildStream )
    .pipe( $.concat( $.pkg.name + '.js') )
    .pipe( $.insert.prepend( $.config.banner ) )
    .pipe( gulp.dest( $.config.paths.outputDir ) )
    .pipe( $.if( isRelease, jsReleaseStream() ));

};
