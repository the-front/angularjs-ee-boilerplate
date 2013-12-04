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

    //--- in memory database

    'app/main/mock/in-memory.db': {
      deps: [
        'angular-mocks-backend',
        'lokijs'
      ]
    },

    //--- @begin: mocks

    'app/main/mock/allow-pass-jsonp': {
      deps: ['angular-mocks-backend']
    },

    'app/help/mock/allow-pass-github': {
      deps: ['angular-mocks-backend']
    },

    'app/bookmarks/resources/mock': {
      deps: ['app/main/mock/in-memory.db']
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
    'app/main/mock/allow-pass-jsonp',
    'app/help/mock/allow-pass-github',
    'app/bookmarks/resources/mock'
  ]);

});