define(function(require) {
  'use strict';

  var module = require('./module');

  module.controller('<%= helpers.capitalize( name ) %>Ctrl', <%= helpers.capitalize( name ) %>Ctrl);

  //---

  // <%= helpers.capitalize( name ) %>Ctrl.$inject = [];

  function <%= helpers.capitalize( name ) %>Ctrl() {
    var vm = this;

    vm.pageName = '<%= helpers.capitalize( name ) %> Page';
  }

});
