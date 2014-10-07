define(function(require) {
  'use strict';

  var module = require('./module');

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
