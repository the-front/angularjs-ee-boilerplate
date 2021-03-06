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
$._               = require('lodash');
$.del             = require('del');
$.lazypipe        = require('lazypipe');
$.runSequence     = require('run-sequence');

$.browserSync     = require('browser-sync');
$.reload          = $.browserSync.reload;

// https://github.com/karma-runner/gulp-karma
$.karma           = require('karma');

$.open            = require('open');

  //--- local modules

$.pkg       = $.rootRequire('package.json');

$.config    = $.rootRequire('tools/config');

$.localip   = $.rootRequire('tools/lib/localip');

$.requirejs = $.rootRequire('tools/lib/requirejs');

$.generate  = $.rootRequire('tools/lib/generate');

//---

$.args = require('yargs').argv;

//---

$.is = { // TODO: review
  karma       : !!$.args.karma,
  protractor  : !!$.args.protractor,
  e2e         : !!$.args.e2e,
  debug       : !!$.args.debug,
  release     : !!$.args.release,
  preview     : !!$.args.preview,
  proxy       : !!$.args.proxy,
  less        : !!$.args.less,
  sass        : !!$.args.sass,

  publish     : !!$.args.publish, // TODO: review - needed?
  init        : !!$.args.init // TODO: review - needed?
};

//---
// @begin: define output dir

(function() {

  $.config.paths.outputDir = (
    ($.is.release || $.is.preview || $.is.e2e) ?
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

  // do not configure proxy if proxy flag isn't present
  if(!$.is.proxy) return;

  // middlewares array
  $.config
    .webserver
    .middlewares = [];

  //---
  // @begin: config proxies
  var proxyMiddleware = require('http-proxy-middleware'),
      hasGulpTaskName = !!$.args._[0];

  if( $.config.webserver.proxies ) {
    $.config
      .webserver
      .proxies.forEach(function(proxy) {
        if( !$.config.webserver.proxy ) $.config.webserver.proxy = proxy;
        configProxy( mountProxyOptions( proxy ) );
      });
  } else if( $.config.webserver.proxy ) {
    configProxy( mountProxyOptions( $.config.webserver.proxy ) );
  }

  function mountProxyOptions( proxy ) {
    return {
      host     : proxy.host || 'localhost',
      port     : proxy.port || 80,
      context  : checkContext(proxy.context),
      https    : proxy.https || false,
      xforward : proxy.xforward || false
    };
  }

  function configProxy( proxyOptions ) {
    $.config
      .webserver
      .middlewares
      .push(
        proxyMiddleware(
          proxyOptions.context,
          {
            target : mountTarget( proxyOptions ),
            secure : proxyOptions.https,
            xfwd   : proxyOptions.xforward
          }
        )
      );
  }

  function checkContext( context ) {
    if( !context ) return '/api';
    if( !/^\//.test(context) ) context = '/' + context;
    return context;
  }

  function mountTarget( proxyOptions ) {
    return (
      ( proxyOptions.https ? 'https://' : 'http://' ) +
      proxyOptions.host + ':' + proxyOptions.port
    );
  }
  // @end: config proxies
  //---

})();

// @end: check webserver configs
//---

/**
  * Log a message or series of messages using chalk's blue color.
  * Can pass in a string, object or array.
  */
$.log = function(msg, color) {
  color = color || $.util.colors.blue;
  if (typeof(msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        $.util.log(color(msg[item]));
      }
    }
  } else {
    $.util.log(color(msg));
  }
};

$.onSuccess = function(msg) {
  $.log(msg, $.util.colors.green);
};

$.onError = function(err) {
  $.log(err, $.util.colors.red);
};

//---

$.swallowError = function(error) {
  // do nothing... but block flow execution
  // this.emit('end');
};

//---

$.projectInfoMsg = function() {
  $.log('');
  $.log('project: ' + $.pkg.name + ' v' + $.pkg.version);
  $.log('description: ' + $.pkg.description);
  $.log('');

  var msg = null;

  if( $.is.release ) {
    msg = ' release';
  } else if( $.is.preview ) {
    msg = ' preview';
  } else if( $.is.proxy ) {
    msg = ' running with proxy';
  }

  if(msg){
    $.log('>> ' + msg);
    $.log('');
  }
};
