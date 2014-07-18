/*

TODO:

- add config to keep http credentials

  [Gist] AngularJS Lesson Learned #2: Enabling HTTP Credentials | Mário Junior
  https://gist.github.com/mariojunior/6175849

    $httpProvider.defaults.withCredentials = true;

  - check invalid session

    [Gist] AngularJS Lesson Learned #1: Getting Invalid Session State | Mário Junior
    https://gist.github.com/mariojunior/6175736

- add config to allow access cross domain resource

    // allow to access cross domain resource
    $httpProvider.defaults.useXDomain = true;

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
    ['$routeProvider',

  // routes definition
  function ($routeProvider) {

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
