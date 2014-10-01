(function() {
  'use strict';

  var _getId = function(id) {
    return element(by.id(id));
  };

  var _getLink = function(text) {
    return element(by.linkText(text));
  };

  var _getBinding = function(binding) {
    return element(by.binding(binding));
  };

  var _getModel = function(model) {
    return element(by.model(model));
  };


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
        }
      },

      search: {
        links: {
          backToList: function() { return _getLink('All Bookmarks'); }
        }
      },

      add: {},

      edit: {},

      form: {
        title: function() { return _getBinding('title'); },

        inputs: {
          name:          function() { return _getModel('bookmarks.name'); },
          url:           function() { return _getModel('bookmarks.url'); },
          description:   function() { return _getModel('bookmarks.description'); }
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
