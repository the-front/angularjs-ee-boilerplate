define(
// require.js dependency injection
[
  './module'
],

// require.js module scope
function(module) {
  'use strict';


  module.config(

    // dependencies injection
    ['$routeProvider',

  // routes definition
  function ($routeProvider) {

    $routeProvider
      .when(
        '/<%= route %>',
        {
          controller: '<%= helpers.capitalize( name ) %>Ctrl',
          templateUrl: '<%= location %>/template.html'
        }
      );

  }]);


});
