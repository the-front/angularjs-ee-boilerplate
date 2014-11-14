define(function(require) {
  'use strict';

  var module = require('../module');

  module.config(configure);
  //---

  configure.$inject = ['$httpProvider', '$provide'];

  function configure($httpProvider, $provide) {

    $provide.factory('ProgressInterceptorDefined', ProgressInterceptorDefined);

    $httpProvider.interceptors.push('ProgressInterceptorDefined');

    //---

    ProgressInterceptorDefined.$inject = ['ProgressInterceptor'];

    function ProgressInterceptorDefined(progress) {

      progress.setHttpProviderDefaults($httpProvider);
      return progress;

    }

  }

});
