define(function(require) {
  'use strict';

  var angular = require('angular');
  require('angularRoute');

  require('angularUiBootstrap');

  // TODO: review and update
  require('./templates/cache');

  // angular module definition
  return angular.module(

    // module name
    'main',

    // module dependencies
    [
      'ngRoute',

      'ui.bootstrap',

      'templatesCache',

      require('shared/fend/progressbar-loading/require.load').name,
      require('shared/fend/navbar/require.load').name,

      require('app/home/require.load').name,
      require('app/about/require.load').name,

      require('app/bookmarks/require.load').name,

      require('app/help/require.load').name,
    ]
  );

});
