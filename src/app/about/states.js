define(function(require) {
  'use strict';

  var module = require('./module');

  module.config(configureStates);

  //---

  configureStates.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configureStates($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('about', {
        url: '/about',
        views: {
          'master': {
            templateUrl   : 'app/main/templates/layout.html'
          },
          'content@about': {
            templateUrl   : 'app/about/templates/page.html',
            controller    : 'AboutCtrl',
            controllerAs  : 'vm'
          }
        }
      });

  }

});
