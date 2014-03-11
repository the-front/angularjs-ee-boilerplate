define(
// require.js dependency injection
[
  'angular',
  
  './require.config',
  
  'ngProgress'
], 

// require.js module scope
function(ng) {
  'use strict';

  // module definition
  return ng.module(
    // module name
    'fend.progressbar.loading',

    // module dependencies
    [
      'ngProgress'
    ]
  );

});