define(function(require) {
  'use strict';

  var module = require('../module');
  require('../resources/rest');

  module.controller('BookmarksNewCtrl', BookmarksNewCtrl);

  //---

  BookmarksNewCtrl.$inject = [
    '$rootScope', '$scope',
    'BookmarksResource', 'InputFocusFactory'
  ];

  function BookmarksNewCtrl($rootScope, $scope, Resource, input) {
    var vm = this;

    vm.title = 'New Bookmark';

    vm.bookmark = new Resource({
      'id':0,
      'name':'',
      'description':'',
      'url':''
    });

    vm.save = save;

    //---

    var ctrlName = 'BookmarksNewCtrl';
    input = input.get(ctrlName);

    input.config(
      $scope,
      [
        'focusBookmarkNameInput'
      ]);

    input.setFocus('focusBookmarkNameInput', 200);

    //console.debug(input);

    //---

    function save() {
      vm.bookmark.$save(function(res) {
        $rootScope.$emit('bookmarks:add:event', 'added');
      });
    }

  }

});
