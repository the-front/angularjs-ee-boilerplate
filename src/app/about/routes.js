define(function(require) {
  'use strict';

  var module = require('./module');

  module.config(configure);

  //---

  configure.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configure($stateProvider, $urlRouterProvider) {

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
