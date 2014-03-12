require.config({

  // libraries dependencies with fallback
  paths: {

    ngProgress: [
      'vendor/ngProgress/1.0.3/ngProgress.min'
    ]

  },

  // define js scripts dependencies
  shim: {

    'ngProgress': {
      deps: ['angular']
    }

  }

});


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