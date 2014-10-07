define(function(require) {
  'use strict';

  var angular = require('angular');
  require('angularRoute');

  // angular module definition
  return angular.module(
    // module name
    'about',

    // module dependencies
    [
      'ngRoute'
    ]
  );

});
