define(function(require) {
  'use strict';

  var module = require('./module');

  module.config(configure);

  //---

  configure.$inject = ['$routeProvider'];

  function configure($routeProvider) {

    $routeProvider
      .when(
        '/help',
        {
          templateUrl: 'app/help/template.html',
          controller: 'HelpCtrl',
          controllerAs: 'vm',
          resolve: {
            githubUser: ResolveGithubUser
          }
        }
      );

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
