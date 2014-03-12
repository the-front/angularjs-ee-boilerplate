require.config({

  // libraries dependencies with fallback
  paths: {

    lokijs: [
      'vendor/lokijs/0.0.1/lokijs.min'
    ]

  }

});


define(
// require.js dependency injection
[
  'shared/mock/module',
  'lokijs'
], 

// require.js module scope
function(module) {
  'use strict';

  module.factory(

    // factory name
    'DataStore', 

    // factory dependencies injection
    [

  // factory definition
  function() {

    // http://lokijs.org/
    return new loki('mock.db');

  }]);

});