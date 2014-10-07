define(function(require) {
  'use strict';

  var module = require('../module');

  module.config(

    ['$httpProvider', '$provide',

  function ($httpProvider, $provide) {

    $provide.factory('ProgressInterceptorDefined',
      ['ProgressInterceptor',
    function(progress) {
      progress.setHttpProviderDefaults($httpProvider);
      return progress;
    }]);

    $httpProvider.interceptors.push('ProgressInterceptorDefined');

  }]);

});
