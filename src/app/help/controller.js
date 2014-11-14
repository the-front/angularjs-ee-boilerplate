define(function(require) {
  'use strict';

  var module = require('./module');

  module.controller('HelpCtrl', HelpCtrl);

  //---

  HelpCtrl.$inject = ['githubUser']; //'$http'

  function HelpCtrl(githubUser) { // $http
    var vm = this;

    vm.pageName = 'Help Page';
    vm.githubUser = githubUser;

  }

});
