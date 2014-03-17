require({

  // libraries dependencies with fallback
  paths: {

    jquery: [
      'vendor/jquery/1.10.2/jquery.min'
    ],

    bootstrap: [
      'vendor/bootstrap/3.0.2/js/bootstrap.min'
    ],

    angular: [
      'vendor/angular.js/1.2.1/angular.min'
    ],

    angularRoute: [
      'vendor/angular.js/1.2.1/angular-route.min'
    ],

    angularResource: [
      'vendor/angular.js/1.2.1/angular-resource.min'
    ],

    angularAnimate: [
      'vendor/angular.js/1.2.1/angular-animate.min'
    ],

    toaster: [
      'vendor/toaster/0.3.0/toaster'
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

    'angularRoute': {
      deps: ['angular']
    },

    'angularResource': {
      deps: ['angular']
    },

    'angularAnimate': {
      deps: ['angular']
    },

    'toaster': {
      deps:['angularAnimate']
    }

  },

  priority: [
    'angular'
  ],

  deps: ['./ng.app']

});