define(
// require.js dependency injection
[
  './module'
],

// require.js module scope
function(module) {
  'use strict';


  module.controller(

    // controller name
    '<%= helpers.capitalize( name ) %>Ctrl',

    // dependencies injection
    ['$scope',

  // controller definition
  function($scope) {

    $scope.pageName = '<%= helpers.capitalize( name ) %> Page';

  }]);


});
