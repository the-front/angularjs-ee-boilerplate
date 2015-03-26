(function() {
  'use strict';

  //----------------------------------------------------------------------------
  // element shortcuts

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
  // list and search options elements

  var _listAndSearch = {
    options: {
      optionsButton:         function() { return _getId('optionsBtn'); },

      filterButton:          function() { return _getId('filterBtn'); },

      pageSizeInput:         function() { return _getModel('vm.pageSize'); },
      pageSizeMessage:       function() { return _getId('pageSizeMessage'); }
    }
  };

  //----------------------------------------------------------------------------
  // table element shortcuts

  var _repeater = function() { return _getRepeater('<%= name %> in vm.result.data'); };

  var _lastRow = function(repeater) {
    repeater = repeater || _repeater();
    return repeater.last();
  };

  var _lastRowName = function(lastRow) {
    lastRow = lastRow || _lastRow();
    return lastRow.element(by.binding('<%= name %>.name'));
  };

  var _lastRowEditLink = function(lastRow) {
    lastRow = lastRow || _lastRow();
    return lastRow.element(by.id('gotoedit_1'));
  };

  //----------------------------------------------------------------------------

  // Page Object
  module.exports = {

    get: function() {
      return browser.get('#/<%= route %>');
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
          backToList: function() { return _getLink('All <%= helpers.capitalize( name ) %>'); }
        },

        searchInput: function() { return _getModel('vm.searchName'); },

        options: _listAndSearch.options
      },

      table: {
        filterTexts:        function() { return _getBindingAll('vm.filter.search'); },
        filterInput:        function() { return _getModel('vm.filter.search'); },
        filterClearButton:  function() { return _getId('filterClearButton'); },
        repeater:           _repeater,
        lastRow:            _lastRow,
        lastRowName:        _lastRowName,
        lastRowEditLink:    _lastRowEditLink
      },

      form: {
        title:             function() { return _getBinding('vm.title'); },
        nameConfirm:       function() { return _getBinding('vm.<%= name %>.name'); },

        inputs: {
          name:            function() { return _getModel('vm.<%= name %>.name'); },
          description:     function() { return _getModel('vm.<%= name %>.description'); }
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
