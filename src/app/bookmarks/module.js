define(function(require) {
  'use strict';

  var angular = require('angular');
  require('angularRoute');
  require('angularResource');

  // TODO: review module deps after update /src/shared
  require('shared/fend/input-utils/require.load');
  require('shared/fend/pagination/require.load');

  // angular module definition
  return angular.module(
    // module name
    'bookmarks',

    // module dependencies
    [
      'ngRoute',
      'ngResource',

      'fend.input.utils',
      'fend.pagination'
    ]
  );

});
