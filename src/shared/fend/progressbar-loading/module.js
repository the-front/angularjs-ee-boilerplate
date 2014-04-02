define(
// require.js dependency injection
[
  'angular',
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
