define(function(require) {
  'use strict';

  var module = require('./module');

  module.controller('HomeCtrl', HomeCtrl);

  //---

  HomeCtrl.$inject = ['toaster'];

  function HomeCtrl($toaster) {
    var vm = this;

    vm.pageName = 'Home Page';

    vm.popup = function(type) {
      $toaster.pop(type, 'Title', 'Short description text...');
      return 'toaster ' + type;
    };

  }

});
