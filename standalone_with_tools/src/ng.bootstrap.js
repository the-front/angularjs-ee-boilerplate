define(
// require.js dependency injection
[
  'angular',

  //'shared/mock/require.load',
  'app/main/require.load'
], 

// require.js module scope
function(ng) {
  'use strict';

  console.log('bootstrap angular application');

  // define run module to bootstrap application
  ng.module(
    // module name
    'run',

    // module dependencies
    [
      //'ngMockBackend',
      'main'      
    ]
  );

  // start angular app
  ng.bootstrap(document, ['run']);

});