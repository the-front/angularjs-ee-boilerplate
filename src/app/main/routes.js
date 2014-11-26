define(function(require) {
  'use strict';

  var module = require('./module');

/* Tips:

[Gist] AngularJS Lesson Learned #2: Enabling HTTP Credentials | Mário Junior
https://gist.github.com/mariojunior/6175849

[Gist] AngularJS Lesson Learned #1: Getting Invalid Session State | Mário Junior
https://gist.github.com/mariojunior/6175736

*/

  module.config(configureStates);

  //---

  configureStates.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

  function configureStates($stateProvider, $urlRouterProvider, $httpProvider) {

    //------------------------------------------------
    // @begin: angular.js $httpProvider useful configs

    // Enabling HTTP Credentials such as backend sessions
    //$httpProvider.defaults.withCredentials = true;

    // allow access to cross domain resource
    //$httpProvider.defaults.useXDomain = true;

    // @end: angular.js $httpProvider useful configs
    //------------------------------------------------

    $urlRouterProvider
      .when('', '/home') // default
      .when('/', '/home') // default
      .otherwise("/404"); // For any unmatched url, redirect to /404

    $stateProvider
      .state('404', {
        url: '/404',
        views: {
          'master': {
            templateUrl   : 'app/main/templates/layout.html'
          },
          /*
          'navbar@404': {
            // default value on 'app/main/templates/layout.html' ui-view navbar
            templateUrl   : 'app/main/templates/navbar.html'
          },
          */
          'content@404': {
            templateUrl   : 'app/main/templates/404.html'
          }/*,
          'footer@404': {
            // default value on 'app/main/templates/layout.html' ui-view footer
            templateUrl   : 'app/main/templates/footer.html'
          }*/
        }

      });

  }

});
