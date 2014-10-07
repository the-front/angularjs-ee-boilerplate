define(function(require) {
  'use strict';

  var angular = require('angular');
  require('angularRoute');

  require('angularUiBootstrap');

  // TODO: review and update
  require('./templates/cache');

  require('shared/fend/progressbar-loading/require.load');
  require('shared/fend/navbar/require.load');

  // angular module definition
  return angular.module(

    // module name
    'main',

    // module dependencies
    [
      'ngRoute',

      'ui.bootstrap',

      'templatesCache',

      'fend.progressbar.loading',
      'fend.navbar',

      require('app/home/require.load').name,
      require('app/about/require.load').name,

      require('app/bookmarks/require.load').name,

      require('app/help/require.load').name,
    ]
  );

});
