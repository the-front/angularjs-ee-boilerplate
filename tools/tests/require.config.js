(function() {
  'use strict';

  var isKarma = (window.__karma__) ? true : false;
  var _baseUrl = isKarma ? '/base/src' : '../src';

  console.log( 'isKarma: ' + isKarma );
  console.log( 'baseUrl: ' + _baseUrl );

  var _config = getRequireConfig();

  //---

  require.config({

    baseUrl: _baseUrl,
    paths : _config.paths,
    shim : _config.shim,

    deps: [
      'app/main/package',

      'angularMocks',

      './require.unit.load'
    ],

    callback: onRequireReadyHandler

  });

  function bootstrapAngularApp(cb) {
    angular.element(document).ready(function() {
      console.log('bootstrap angular application');
      // start angular app
      angular.bootstrap(document, ['main']);

      if(cb) cb();
    });
  }

  function karmaFlow() {
    var allTemplateCacheFiles = [];
    var TEMPLATE_CACHE_REGEXP = /html\.js$/i;

    var pathToTemplateCache = function(path) {
      return path.replace(/^\/base\/src\//, '').replace(/\.js$/, '');
    };

    Object.keys(window.__karma__.files).forEach(function(file) {
      if (TEMPLATE_CACHE_REGEXP.test(file)) {
        // Normalize paths to RequireJS module names.
        allTemplateCacheFiles.push(pathToTemplateCache(file));
      }
    });

    require(['angular'], function(angular) {
      console.log( 'angular loaded' );

      require(allTemplateCacheFiles, function() {
        console.log( 'ng-html2js files loaded' );

        bootstrapAngularApp(function() {
          window.__karma__.start();
        });

      });

    });

  }


  function onRequireReadyHandler() {
    console.log( 'onRequireReadyHandler' );

    if(isKarma) karmaFlow();

  }

})();
