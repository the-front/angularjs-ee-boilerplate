define(function(require) {
  'use strict';

  var module = require('./module');

  module.controller(

    // controller name
    'HelpCtrl',

    // dependencies injection
    ['$scope', '$http',

  // controller definition
  function($scope, $http) {

    $scope.pageName = 'Help Page';

    $http.get('https://api.github.com/users/erkobridee').success(function(data) {
      $scope.githubUser = data;
    });

  }]);

});
