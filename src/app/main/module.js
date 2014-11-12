define(function(require) {
  'use strict';

  var angular = require('angular');
  require('angularRoute');

  require('angularUiBootstrap');

  // angular module definition
  return angular.module(

    // module name
    'main',

    // module dependencies
    [
      'ngRoute',

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
