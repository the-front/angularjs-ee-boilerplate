define(function(require) {
  'use strict';

  var module = require('../module');
  require('../resources/rest');

  module.controller('<%= helpers.capitalize( name ) %>NewCtrl', <%= helpers.capitalize( name ) %>NewCtrl);

  //---

  <%= helpers.capitalize( name ) %>NewCtrl.$inject = [
    '$rootScope', '$scope',
    '<%= helpers.capitalize( name ) %>Resource', 'InputFocusFactory'
  ];

  function <%= helpers.capitalize( name ) %>NewCtrl($rootScope, $scope, Resource, input) {
    var vm = this;

    vm.title = 'New <%= helpers.capitalize( name ) %>';

    vm.<%= name %> = new Resource({
      'id':0,
      'name':'',
      'description':''
    });

    vm.save = save;

    //---

    var ctrlName = '<%= helpers.capitalize( name ) %>NewCtrl';
    input = input.get(ctrlName);

    input.config(
      $scope,
      [
        'focus<%= helpers.capitalize( name ) %>NameInput'
      ]);

    input.setFocus('focus<%= helpers.capitalize( name ) %>NameInput', 200);

    //console.debug(input);

    //---

    function save() {
      vm.<%= name %>.$save(function(res) {
        $rootScope.$emit('<%= name %>:add:event', 'added');
      });
    }

  }

});
