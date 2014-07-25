define(
// require.js dependency injection
[
  '../module'
],

// require.js module scope
function(module) {
  'use strict';


  module.factory(

    // resource name
    '<%= helpers.capitalize( name ) %>Resource',

    // dependency injection
    ['$resource',

  function($resource) {

    var rest = $resource(
      '<%= endpoint %>/:id',
      {
        'id': ''
      },
      {
        'update': { 'method': 'PUT' }
      }
    );

    return rest;

  }]);


});
