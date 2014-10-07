define(function(require) {
  'use strict';

  var angular = require('angular');
  require('ngProgress');

  // angular module definition
  return angular.module(
    // module name
    'fend.progressbar.loading',

    // module dependencies
    [
      'ngProgress'
    ]
  );

});
