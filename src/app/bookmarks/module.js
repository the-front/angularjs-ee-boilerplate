define(function(require) {
  'use strict';

  var angular = require('angular');

  // TODO: remove
  require('angularRoute');

  require('angularResource');

  require('uiRouter');

  // angular module definition
  return angular.module(
    // module name
    'bookmarks',

    // module dependencies
    [
      // TODO: remove
      'ngRoute',

      'ngResource',

      'ui.router',

      require('shared/fend/input-utils/package').name,
      require('shared/fend/pagination/package').name
    ]
  );

});
