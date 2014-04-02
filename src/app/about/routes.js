define(
// require.js dependency injection
[
  './module'
],

// require.js module scope
function(module) {
  'use strict';


  module.config(

    // dependencies injection
    ['$routeProvider',

  // routes definition
  function ($routeProvider) {

    $routeProvider
      .when(
        '/about',
        {
          controller: 'AboutCtrl',
          templateUrl: 'app/about/template.html'
        }
      );

  }]);


});
