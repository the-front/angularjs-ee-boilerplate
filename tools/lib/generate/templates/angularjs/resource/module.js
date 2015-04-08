define(function(require) {
  'use strict';

  var angular = require('angular');
  require('angularResource');

  // angular module definition
  return angular.module(
    // module name
    '<%= name %>',

    // module dependencies
    [
      'ngResource'
    ]
  );

});
