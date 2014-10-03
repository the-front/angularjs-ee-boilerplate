(function() {
  'use strict';

  //----------------------------------------------------------------------------

  var _getId = function(id) {
    return element(by.id(id));
  };

  var _getLink = function(text) {
    return element(by.linkText(text));
  };

  var _getBinding = function(binding) {
    return element(by.binding(binding));
  };

  var _getBindingAll = function(binding) {
    return element.all(by.binding(binding));
  };

  var _getModel = function(model) {
    return element(by.model(model));
  };

  var _getRepeater = function(repeater) {
    return element.all(by.repeater(repeater));
  };

  //----------------------------------------------------------------------------

  var _listAndSearch = {
    options: {
      optionsButton:         function() { return _getId('optionsBtn'); },

      filterButton:          function() { return _getId('filterBtn'); },

      pageSizeInput:         function() { return _getModel('pageSize'); },
      pageSizeMessage:       function() { return _getId('pageSizeMessage'); }
    }
  };

  //----------------------------------------------------------------------------

  // Page Object
  module.exports = {

    get: function() {
      return browser.get('#/bookmarks');
    },

    on: {

      list: {
        links: {
          search:  function() { return _getLink('Search'); },
          new:     function() { return _getLink('New'); }
        },

        options: _listAndSearch.options
      },

      search: {
        links: {
          backToList: function() { return _getLink('All Bookmarks'); }
        },

        searchInput: function() { return _getModel('searchName'); },

        options: _listAndSearch.options
      },

      table: {
        filterTexts:        function() { return _getBindingAll('filter.search'); },
        filterInput:        function() { return _getModel('filter.search'); },
        filterClearButton:  function() { return _getId('filterClearButton'); },
        repeater:           function() { return _getRepeater('bookmark in result.data'); }
      },

      form: {
        title: function() { return _getBinding('title'); },

        inputs: {
          name:          function() { return _getModel('bookmark.name'); },
          url:           function() { return _getModel('bookmark.url'); },
          description:   function() { return _getModel('bookmark.description'); }
        },

        buttons: {
          cancelLink:      function() { return _getId('cancelLinkBtn'); },
          save:            function() { return _getId('saveBtn'); },
          deleteConfirm:   function() { return _getId('deleteConfirmBtn'); },
          delete:          function() { return _getId('deleteBtn'); },
          cancel:          function() { return _getId('cancelBtn'); }
        }
      }
    }

  };

})();
