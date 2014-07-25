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
    '<%= helpers.capitalize( name ) %>SearchResource',

    // dependency injection
    ['$resource',

  function($resource) {

    var rest = $resource(
      '<%= endpoint %>/search/:name'
    );

    return rest;

  }]);


});
