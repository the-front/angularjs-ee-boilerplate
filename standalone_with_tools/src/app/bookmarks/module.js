define(
// require.js dependency injection
[
  'angular',
  'angularRoute',
  'angularResource',

  'shared/fend/input-utils/require.load',
  'shared/fend/pagination/require.load'
], 

// require.js module scope
function(ng) {
  'use strict';

  // module definition
  return ng.module(
    // module name
    'bookmarks', 

    // module dependencies
    [
      'ngRoute', 
      'ngResource',

      'fend.input.utils', 
      'fend.pagination'      
    ]
  );

});