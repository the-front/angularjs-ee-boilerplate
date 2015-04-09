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

$.del             = require('del');
$.lazypipe        = require('lazypipe');
$.runSequence     = require('run-sequence');

  //--- local modules

$.mainPkg   = require( $.path.join( $.path.resolve( '../' ), 'package.json' ) );

$.pkg       = $.rootRequire('package.json');

$.config    = $.rootRequire('config');

//---

$.args = require('yargs').argv;

//---

$.is = {
  debug   : !!$.args.debug,
  publish : !!$.args.publish,
  init    : !!$.args.init
};

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
