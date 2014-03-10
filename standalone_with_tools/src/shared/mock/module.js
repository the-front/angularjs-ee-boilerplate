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
  var mockModule = ng.module('ngMockBackend');

  return mockModule;

});