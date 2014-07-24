/*

[Gist] AngularJS Lesson Learned #2: Enabling HTTP Credentials | Mário Junior
       https://gist.github.com/mariojunior/6175849


TODO:

  - create code to check invalid session?

    [Gist] AngularJS Lesson Learned #1: Getting Invalid Session State | Mário Junior
    https://gist.github.com/mariojunior/6175736

*/

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
    ['$routeProvider', '$httpProvider',

  // routes definition
  function ($routeProvider, $httpProvider) {


    //------------------------------------------------
    // @begin: angular.js $httpProvider useful configs

    // Enabling HTTP Credentials such as backend sessions
    //$httpProvider.defaults.withCredentials = true;

    // allow access to cross domain resource
    //$httpProvider.defaults.useXDomain = true;

    // @end: angular.js $httpProvider useful configs
    //------------------------------------------------


    $routeProvider
      .when(
        '/404',
        {
          templateUrl: 'app/main/templates/404.html'
        }
      )

      .otherwise({redirectTo:'/404'});

  }]);


});
