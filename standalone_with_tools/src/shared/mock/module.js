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