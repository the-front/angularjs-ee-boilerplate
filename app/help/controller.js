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
    'HelpCtrl',

    // dependencies injection
    ['$scope', '$http',

  // controller definition
  function($scope, $http) {

    $scope.pageName = 'Help Page';

    $http.get('https://api.github.com/users/erkobridee').success(function(data) {
      console.debug(data);
    });

  }]);


});