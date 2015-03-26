define(function(require) {
  'use strict';

  var module = require('../module');
  require('../resources/rest');

  module.controller('<%= helpers.capitalize( name ) %>EditCtrl', <%= helpers.capitalize( name ) %>EditCtrl);

  //---

  <%= helpers.capitalize( name ) %>EditCtrl.$inject = [
    '$rootScope', '$scope', '<%= helpers.capitalize( name ) %>Resource',
    '$stateParams', 'InputFocusFactory'
  ];

  function <%= helpers.capitalize( name ) %>EditCtrl(
      $rootScope, $scope, resource, params, input
  ) {
    var vm = this;

    vm.title = 'Edit <%= helpers.capitalize( name ) %> : ' + params.id;

    vm.<%= name %> = undefined;

    vm.showConfirm = false;

    vm.save = save;

    vm.remove = remove;

    vm.cancelRemove = cancelRemove;

    vm.destroy = destroy;

    //---

    var ctrlName = '<%= helpers.capitalize( name ) %>EditCtrl';
    input = input.get(ctrlName);

    input.config(
      $scope,
      [
        'focus<%= helpers.capitalize( name ) %>NameInput'
      ]);

    //console.debug(input);

    //---

    // TODO: move to route resolve?
    resource.get({id: params.id}, function(result) {
      vm.<%= name %> = result;
      input.setFocus('focus<%= helpers.capitalize( name ) %>NameInput', 200);
    });

    //---

    function save() {
      vm.<%= name %>.$update({id: params.id}, function(res) {
        $rootScope.$emit('<%= name %>:update:event', 'updated');
      });
    }

    function remove() {
      vm.showConfirm = true;
    }

    function cancelRemove() {
      vm.showConfirm = false;
      input.focusReset();
      input.setFocus('focus<%= helpers.capitalize( name ) %>NameInput');
    }

    function destroy() {
      vm.<%= name %>.$delete({id: params.id}, function(res) {
        vm.showConfirm = false;
        $rootScope.$emit('<%= name %>:remove:event', 'removed');
      });
    }

  }

});
