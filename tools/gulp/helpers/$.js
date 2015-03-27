// Expose all Gulp plugins found
var $ = module.exports = require('gulp-load-plugins')();

//---

// Expose some other modules
$.path            = require('path');

$.rootPath = $.path.resolve( './' );

// [Gist] Better local require() paths for Node.js
// https://gist.github.com/branneman/8048520
$.rootRequire = function( name ) {
  return require( $.path.join( $.rootPath, name ) );
};

//---

// $._               = require('lodash');

$.del             = require('del');
$.lazypipe        = require('lazypipe');
$.runSequence     = require('run-sequence');

$.browserSync     = require('browser-sync');
$.reload          = $.browserSync.reload;

$.open            = require('open');

/*
$.through2       = require('through2');
$.series         = require('stream-series');
*/

  //--- local modules

$.pkg = $.rootRequire('package.json');

$.config = $.rootRequire('tools/config');

$.localip = $.rootRequire('tools/lib/localip');

//---

$.args = require('yargs').argv;

//---

$.is = {
  debug     : !!$.args.debug,
  release   : !!$.args.release,
  preview   : !!$.args.preview,
  less      : !!$.args.less,
  sass      : !!$.args.sass
};

//---
// @begin: define output dir

(function() {

  $.config.paths.outputDir = (
    $.is.release ?
      $.config.paths.dist :
      $.config.paths.build
  );

})();

// @end: define output dir
//---
// @begin: check webserver configs

(function() {

  $.config
    .webserver = $.config.webserver || {};

  $.config
    .webserver
    .port = parseInt($.args.port, 10) || $.config.webserver.port || 3000;

})();

// @end: check webserver configs
//---

/**
  * Log a message or series of messages using chalk's blue color.
  * Can pass in a string, object or array.
  */
$.log = function(msg) {
  if (typeof(msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        $.util.log($.util.colors.blue(msg[item]));
      }
    }
  } else {
    $.util.log($.util.colors.blue(msg));
  }
};

$.onError = function(err) {
  $.log(err);
};

//---

$.projectInfoMsg = function() {
  $.log('');
  $.log('project: ' + $.pkg.name + ' v' + $.pkg.version);
  $.log('description: ' + $.pkg.description);
  $.log('');

  var msg = '';

  if( $.is.release ) {
    msg += ' release';

    $.log('>> ' + msg);
    $.log('');
  }
};
