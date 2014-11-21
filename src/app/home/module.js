define(function(require) {
  'use strict';

  var angular = require('angular');

  require('uiRouter');

  require('toaster');

  // angular module definition
  return angular.module(
    // module name
    'home',

    // module dependencies
    [
      'ui.router',

      'toaster'
    ]
  );

});
