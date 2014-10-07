define(function(require) {
  'use strict';

  var module = require('./module');

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
