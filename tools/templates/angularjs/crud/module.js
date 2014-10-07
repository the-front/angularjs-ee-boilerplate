define(function(require) {
  'use strict';

  var angular = require('angular');
  require('angularRoute');
  require('angularResource');

  // angular module definition
  return angular.module(
    // module name
    '<%= name %>',

    // module dependencies
    [
      'ngRoute',
      'ngResource',

      require('shared/fend/input-utils/require.load').name,
      require('shared/fend/pagination/require.load').name,

    ]
  );

});
