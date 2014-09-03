define(
// require.js dependency injection
[
  '../module'
],

// require.js module scope
function(module) {
  'use strict';


  module.config(

    ['$httpProvider',

  function ($httpProvider) {

    var interceptor = ['ProgressInterceptor', function(progress) {
      progress.setHttpProviderDefaults($httpProvider);
      return progress;
    }];

    $httpProvider.interceptors.push(interceptor);

  }]);


});
