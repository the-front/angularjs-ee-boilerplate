define(
// require.js dependency injection
[
  'require',
  'angular',
  'ngProgress'
], 

// require.js module scope
function(require, ng) {
  'use strict';

  console.log(require.toUrl('ngProgress'));

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