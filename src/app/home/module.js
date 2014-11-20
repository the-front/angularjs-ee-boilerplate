define(function(require) {
  'use strict';

  var angular = require('angular');

  // TODO: remove
  require('angularRoute');

  require('uiRouter');

  require('toaster');

  // angular module definition
  return angular.module(
    // module name
    'home',

    // module dependencies
    [
      // TODO: remove
      'ngRoute',

      'ui.router',

      'toaster'
    ]
  );

});
