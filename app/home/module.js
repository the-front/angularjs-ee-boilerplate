define(
// require.js dependency injection
[
  'angular',
  'angularRoute',

  'toaster'
], 

// require.js module scope
function(ng) {
  'use strict';

  // module definition
  return ng.module(
    // module name
    'home',

    // module dependencies
    [
      'ngRoute',
      
      'toaster'
    ]
  );

});