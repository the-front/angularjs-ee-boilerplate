(function(root){
  'use strict';

  function getRequireConfig() {
    return {

      // libraries dependencies (fallback support)
      paths: {

        jquery: [
          'vendor/jquery/2.2.1/jquery.min'
        ],

        bootstrap: [
          'vendor/bootstrap/3.3.6/js/bootstrap.min'
        ],


        angular: [
          'vendor/angular.js/1.3.11/angular.min'
        ],

        angularResource: [
          'vendor/angular.js/1.3.11/angular-resource.min'
        ],

        angularAnimate: [
          'vendor/angular.js/1.3.11/angular-animate.min'
        ],


        uiBootstrap: [
          'vendor/angular-ui/bootstrap/0.12.0/ui-bootstrap-tpls.min'
        ],

        uiRouter: [
          'vendor/angular-ui/ui-router/0.2.13/angular-ui-router.min'
        ],

        toaster: [
          'vendor/toaster/0.3.0/toaster'
        ],

        ngProgress: [
          'vendor/ngProgress/1.0.3/ngProgress.min'
        ],


        // @begin: mock libs
        angularMocks: [
          'vendor/angular.js/1.3.11/angular-mocks'
        ],

        angularMocksBackend: [
          'vendor/angular-mocks-backend/0.1.7/angular-mocks-backend'
        ],
        // @end: mock libs


        lokijs: [
          'vendor/lokijs/1.0.1/lokijs.min'
        ]

      },

      // define js scripts dependencies
      shim: {

        'bootstrap': {
          deps: ['jquery']
        },

        'angular': {
          deps: ['bootstrap'],
          exports: 'angular'
        },

        'angularResource': {
          deps: ['angular']
        },

        'angularAnimate': {
          deps: ['angular']
        },

        'uiBootstrap': {
          deps: ['bootstrap',  'angular']
        },

        'uiRouter': {
          deps: ['angular']
        },

        'ngProgress': {
          deps: ['angular']
        },

        'toaster': {
          deps:['angularAnimate']
        },


        // @begin: mock js shim/deps
        'angularMocks': {
          deps: ['angular']
        },

        'angularMocksBackend': {
          deps: ['angularMocks']
        }
        // @end: mock js shim/deps

      },

      priority: [
        'angular'
      ],

      deps: null

    };
  }

  root.getRequireConfig = getRequireConfig;

  if(typeof exports === 'object'){
    // expose to use in require.js minification
    module.exports = getRequireConfig();
  } else {
    var isKarma = (window.__karma__) ? true : false;
    // avoid erros when running karma tests
    if(!isKarma){
      var _config = getRequireConfig();
      _config.deps = ['./ng.app'];
      require.config(_config);
    }
  }
})(this);
