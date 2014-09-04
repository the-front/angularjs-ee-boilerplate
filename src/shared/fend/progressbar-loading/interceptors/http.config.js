define(
// require.js dependency injection
[
  '../module'
],

// require.js module scope
function(module) {
  'use strict';


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
