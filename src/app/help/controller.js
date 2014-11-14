define(function(require) {
  'use strict';

  var module = require('./module');

  module.controller('HelpCtrl', HelpCtrl);

  //---

  HelpCtrl.$inject = ['$http'];

  function HelpCtrl($http) {
    var vm = this;

    vm.pageName = 'Help Page';
    vm.githubUser = undefined;

    getGitHubUser();

    //---

    // TODO: use resolve in some near future
    function getGitHubUser() {
      return $http.get('https://api.github.com/users/erkobridee').success(function(data) {
        vm.githubUser = data;
        return vm.githubUser;
      });
    }

  }

});
