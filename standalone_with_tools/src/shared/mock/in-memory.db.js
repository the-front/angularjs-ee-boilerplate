define(
// require.js dependency injection
[
  'lokijs',
  'shared/mock/module'
], 

// require.js module scope
function(loki, module) {
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