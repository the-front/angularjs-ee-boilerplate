define(function(require) {
  'use strict';

  var module = require('../module');
  require('../resources/rest');

  module.controller('BookmarksEditCtrl', BookmarksEditCtrl);

  //---

  BookmarksEditCtrl.$inject = [
    '$rootScope', '$scope',
    'BookmarksResource', '$routeParams',
    'InputFocusFactory'
  ];

  function BookmarksEditCtrl($rootScope, $scope, resource, $routeParams, input) {
    var vm = this;

    vm.title = 'Edit Bookmark : ' + $routeParams.id;

    vm.bookmark = undefined;

    vm.showConfirm = false;

    vm.save = save;

    vm.remove = remove;

    vm.cancelRemove = cancelRemove;

    vm.destroy = destroy;

    //---

    var ctrlName = 'BookmarksEditCtrl';
    input = input.get(ctrlName);

    input.config(
      $scope,
      [
        'focusBookmarkNameInput'
      ]);

    //console.debug(input);

    //---

    // TODO: move to route resolve?
    resource.get({id: $routeParams.id}, function(result) {
      vm.bookmark = result;
      input.setFocus('focusBookmarkNameInput', 200);
    });

    //---

    function save() {
      vm.bookmark.$update({id: $routeParams.id}, function(res) {
        $rootScope.$emit('bookmarks:update:event', 'updated');
      });
    }

    function remove() {
      vm.showConfirm = true;
    }

    function cancelRemove() {
      vm.showConfirm = false;
      input.focusReset();
      input.setFocus('focusBookmarkNameInput');
    }

    function destroy() {
      vm.bookmark.$delete({id: $routeParams.id}, function(res) {
        vm.showConfirm = false;
        $rootScope.$emit('bookmarks:remove:event', 'removed');
      });
    }

  }

});
