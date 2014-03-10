define(
// require.js dependency injection
[
  'angular',
  'angularMocksBackend'
], 

// require.js module scope
function(ng) {
  'use strict';

  var mockBackend = ng.mock.backend;  

  return mockBackend;

});