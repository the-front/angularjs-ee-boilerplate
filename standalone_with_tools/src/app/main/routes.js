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
        '/',
        {
          controller: 'HomeCtrl',
          templateUrl: 'app/home/template.html'
        }
      )
      .when(
        '/about',
        {
          controller: 'AboutCtrl',
          templateUrl: 'app/about/template.html'
        }
      )
      .when(
        '/help',
        {
          controller: 'HelpCtrl',
          templateUrl: 'app/help/template.html'
        }
      )
      .when(
        '/404',
        {
          templateUrl: 'app/404/template.html'
        }
      )

      .otherwise({redirectTo:'/404'});

  }]);


});