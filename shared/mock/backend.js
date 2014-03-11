define(
// require.js dependency injection
[
  'angular',

  './require.config',

  'angularMocksBackend'
], 

// require.js module scope
function(ng) {
  'use strict';

  return ng.mock.backend; 

});