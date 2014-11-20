define(function(require) {
  'use strict';

  var angular = require('angular');
  // TODO: remove
  require('angularRoute');

  require('uiRouter');

  require('angularUiBootstrap');

  // angular module definition
  return angular.module(

    // module name
    'main',

    // module dependencies
    [
      // TODO: remove
      'ngRoute',

      'ui.router',

      'ui.bootstrap',

      require('./templates/cache').name,

      require('shared/fend/progressbar-loading/package').name,
      require('shared/fend/navbar/package').name,

      require('app/home/package').name,
      require('app/about/package').name,

      require('app/bookmarks/package').name,

      require('app/help/package').name,


      // TODO: add here module to load


    ]
  );

});
