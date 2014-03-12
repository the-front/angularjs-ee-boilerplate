require.config({

  // libraries dependencies with fallback
  paths: {

    angularMocks: [
      'vendor/angular.js/1.2.1/angular-mocks'
    ],

    angularMocksBackend: [
      'vendor/angular-mocks-backend/0.1.3/angular-mocks-backend'
    ]

  },

  // define js scripts dependencies
  shim: {

    'angularMocks': {
      deps: ['angular']
    },

    'angularMocksBackend': {
      deps: ['angularMocks']
    }

  }

});


define(
// require.js dependency injection
[
  'angular',
  'angularMocksBackend'
], 

// require.js module scope
function(ng) {
  'use strict';

  // get mock module
  return ng.module('ngMockBackend');

});