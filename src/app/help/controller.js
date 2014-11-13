define(function(require) {
  'use strict';

  var module = require('./module');

  module.controller('HelpCtrl', HelpCtrl);

  //---

  HelpCtrl.$inject = ['$http'];

  function HelpCtrl($http) {
    var vm = this;

    vm.pageName = 'Help Page';

    $http.get('https://api.github.com/users/erkobridee').success(function(data) {
      vm.githubUser = data;
    });

  }

});
