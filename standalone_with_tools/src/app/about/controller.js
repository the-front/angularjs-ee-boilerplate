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
    'AboutCtrl',

    // dependencies injection
    ['$scope',

  // controller definition
  function($scope) {

    $scope.pageName = 'About Page';

  }]);


});