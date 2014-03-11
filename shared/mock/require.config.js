require({

  // libraries dependencies with fallback
  paths: {

    angularMocks: [
      'vendor/angular.js/1.2.1/angular-mocks'
    ],

    angularMocksBackend: [
      'vendor/angular-mocks-backend/0.1.3/angular-mocks-backend'
    ],

    lokijs: [
      'vendor/lokijs/0.0.1/lokijs.min'
    ]

  },

  // define js scripts dependencies
  shim: {

    'angularMocks': {
      deps: ['angular']
    },

    'angularMocksBackend': {
      deps: ['angularMocks']
    },

    'lokijs': {
      exports: 'lokijs'
    }

  },

  priority: [
    'angularMocks'
  ]

});