define(function(require) {
  'use strict';

  var module = require('./module');

  module.config(configure);

  //---

  configure.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configure($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('help', {
        url: '/help',
        views: {
          'master': {
            templateUrl   : 'app/main/templates/layout.html'
          },
          'content@help': {
            templateUrl   : 'app/help/template.html',
            controller    : 'HelpCtrl',
            controllerAs  : 'vm',
            resolve: {
              githubUser  : ResolveGithubUser
            }
          }
        }
      });

  }

  //---

  ResolveGithubUser.$inject = ['$http'];

  function ResolveGithubUser($http) {
    return $http
      .get('https://api.github.com/users/erkobridee')
      .success(function(data) {
        return data;
      });
  }

});
