define(function(require) {
  'use strict';

  var module = require('../module');
  require('../resources/rest');

  module.controller(

    // controller name
    'BookmarksListCtrl',

    // dependencies injection
    [
      '$rootScope', '$scope', '$location',
      'BookmarksResource', 'PaginationFactory', 'InputFocusFactory',
      '$log',

  // controller definition
  function ($rootScope, $scope, $location, resource, pagination, input, console) {

    var ctrlName = 'BookmarksListCtrl';
    input = input.get(ctrlName);
    pagination = pagination.get(ctrlName);

    /*
    console.debug(ctrlName);
    console.debug(input);
    console.debug(pagination);
    */

    //---

    function updateLocation() {
      $location.path('/bookmarks');
    }

    $rootScope.$on('bookmarks:add:event', function(event, value) {
      event.preventDefault(); event.stopPropagation();

      console.debug('bookmarks:add:event - ' + value);

      pagination.addCheck();
      updateLocation();
    });

    $rootScope.$on('bookmarks:update:event', function(event, value) {
      event.preventDefault(); event.stopPropagation();

      console.debug('bookmarks:update:event - ' + value);

      updateLocation();
    });

    $rootScope.$on('bookmarks:remove:event', function(event, value) {
      event.preventDefault(); event.stopPropagation();

      console.debug('bookmarks:remove:event - ' + value);

      pagination.removeCheck();
      updateLocation();
    });

    //---

    input.config(
      $scope,
      [
        'focusPageSizeInput',
        'focusFilterSearchInput'
      ]);

    //---

    var config = {
      pageMinSize: 2,
      pageMaxSize: 50,
      showFilterBtnMinlength: 5
    };

    //---

    function stringEmpty(str) {
      var pattern = /^\s*$/;
      return (str === null || pattern.test(str));
    }

    //---

    function updateInterface() {
      $scope.clearFilter();

      // check if filter is visible
      if($scope.showOptions) $scope.showOptionsBtnClick();
      if($scope.showFilter || $scope.showFilterBtnActive) $scope.showFilterBtnClick();

      // check if filter is needed
      $scope.showFilterBtn = checkShowfilterBtn();

      $scope.showPagination = true;
      $scope.showFilter = false;
      $scope.showFilterBtnActive = false;
    }

    //---

    function loadData(page) {
      resource.get(
        {
          page: page,
          size: pagination.getPageSize()
        },
        function(result) {

          //console.debug(result);

          $scope.result = result;

          $scope.currentPage = result.page;

          pagination.updateMetainf(
            result.count,
            result.data.length,
            result.page,
            result.pages
          );

          updateInterface();
        }
      );
    }

    //---
    // @begin: options

    $scope.showOptions = false;

    $scope.optionsBtnLabel = 'Show Options';

    $scope.showOptionsBtnClick = function() {
      $scope.showOptions = !$scope.showOptions;
      $scope.optionsBtnLabel = ($scope.showOptions ? 'Hide' : 'Show') + ' Options';

      if($scope.showOptions) {
        $scope.showFilter = $scope.showFilterBtnActive;

        if($scope.showFilter) input.setFocus('focusFilterSearchInput');
        else input.setFocus('focusPageSizeInput');
      } else {
        if($scope.showFilter && stringEmpty($scope.filter.search)) $scope.showFilterBtnClick();
        $scope.showFilter = false;

        input.focusReset();
      }
    };

    // @end: options
    //---
    // @begin: filter

    $scope.filter = { search: '' };
    $scope.showFilter = false;

    function checkShowfilterBtn() {
      return (
        (pagination.getPageSize() >= config.showFilterBtnMinlength) &&
        (pagination.metainf.lastPageSize >= config.showFilterBtnMinlength)
      );
    }

    $scope.showFilterBtn = false;
    $scope.showFilterBtnActive = false;

    $scope.filterBtnLabel = 'Show filter';

    $scope.showFilterBtnClick = function() {
      $scope.showFilter = $scope.showFilterBtnActive = !$scope.showFilter;
      $scope.filterBtnLabel = ($scope.showFilter ? 'Hide' : 'Show') + ' filter';
      if(!$scope.showFilter) $scope.clearFilter();
      $scope.showPagination = !$scope.showFilter;

      // change input field focus
      if($scope.showFilter) input.setFocus('focusFilterSearchInput');
      else input.setFocus('focusPageSizeInput');
    };

    $scope.clearFilter = function() {
      $scope.filter = { search: '' };
    };

    // @end: filter
    //---
    // @begin: pagination

    $scope.showPagination = true;
    $scope.pageSize = pagination.getPageSize();
    $scope.pageMinSize = config.pageMinSize;
    $scope.pageMaxSize = config.pageMaxSize;


    $scope.paginationItemsSize = 5;
    $scope.paginationPageSize = pagination.getPageSize();


    $scope.pageChanged = function() {
      if(this.currentPage != $scope.result.page) {
        pagination.setNextPage(this.currentPage);
        loadData(pagination.getNextPage());
      }
    };

    $scope.updatePageSizeInvalid = function(pageSize) {
      var flag = false;

      flag = (
        pageSize === undefined ||
        pageSize === null ||
        pageSize === pagination.getPageSize() ||
        pageSize < $scope.pageMinSize ||
        pageSize > $scope.pageMaxSize
      );

      return flag;
    };

    $scope.updatePageSize = function() {
      // check if filter is visible
      if($scope.showFilter) $scope.showFilterBtnClick();

      pagination.resetPageSize($scope.pageSize);
      $scope.paginationPageSize = pagination.getPageSize();

      loadData(pagination.getNextPage());
    };

    $scope.updatePageSizeFormSubmit = function() {
      if(!$scope.updatePageSizeInvalid($scope.pageSize))
        $scope.updatePageSize();
    };

    // @end: pagination
    //---

    loadData(pagination.getNextPage());

  }]);

});
