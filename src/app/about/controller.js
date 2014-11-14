define(function(require) {
  'use strict';

  var module = require('./module');

  module.controller('AboutCtrl', AboutCtrl);

  //---

  //AboutCtrl.$inject = [];

  function AboutCtrl() {
    var vm = this;

    vm.pageName = 'About Page';
  }

});
