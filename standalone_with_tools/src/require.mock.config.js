require({

  // libraries dependencies with fallback
  paths: {

    'angular-mocks': [
      'vendor/angular.js/1.2.1/angular-mocks'
    ],

    'angular-mocks-backend': [
      'vendor/angular-mocks-backend/0.1.3/angular-mocks-backend'
    ],

    'lokijs': [
      'vendor/lokijs/0.0.1/lokijs.min'
    ]

  },

  // define js scripts dependencies
  shim: {

    'angular-mocks': {
      deps: [
        'angular_route', 
        'angular_resource'
      ]
    },

    'angular-mocks-backend': {
      deps: ['angular-mocks']
    },

    //--- @begin: shared utils

    'shared/mock/helpers': {
      deps: ['angular-mocks-backend']
    },

    'shared/mock/in-memory.db': {
      deps: [
        'angular-mocks-backend',
        'lokijs'
      ]
    },

    //--- @end: shared utils

    //--- @begin: allow pass to server

    'shared/mock/allow-pass-jsonp': {
      deps: ['angular-mocks-backend']
    },

    'app/help/mock/allow-pass-github': {
      deps: ['angular-mocks-backend']
    },

    'app/bookmarks/mock/allow-pass': {
      deps: ['angular-mocks-backend']
    },

    //--- @end: allow pass to server

    //--- @begin: mocks

    'app/bookmarks/mock/data': {
      deps: [
        'shared/mock/in-memory.db',
        'shared/mock/helpers'
      ]
    },

    'app/bookmarks/mock/url-interceptors': {
      deps: ['app/bookmarks/mock/data']
    }

    //--- @end: mocks

  }

},

['require'], function(require) {

  console.log('project require mock config');

  console.log(GLOBAL.appModuleDeps);

  // update app module dependencies array
  GLOBAL.appModuleDeps = GLOBAL.appModuleDeps.concat(['ngMockBackend']);

  console.log(GLOBAL.appModuleDeps);

  // start
  require([
    'shared/mock/allow-pass-jsonp',    

    //'app/bookmarks/mock/allow-pass',
    'app/bookmarks/mock/url-interceptors',

    'app/help/mock/allow-pass-github'
  ]);

});