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
    'HomeCtrl',

    // dependencies injection
    ['$scope', 'toaster',

  // controller definition
  function ($scope, $toaster) {

    $scope.pageName = 'Home Page';

    $scope.popup = function(type) {
      $toaster.pop(type, 'Title', 'Short description text...');
      return 'toaster ' + type;
    };

  }]);


});
