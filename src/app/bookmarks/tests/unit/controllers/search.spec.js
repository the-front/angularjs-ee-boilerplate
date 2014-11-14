describe('Testing Bookmarks Search Controller', function() {

  function backendList(search, page, pageSize) {
    search = search || 'something';
    page = page || 1;
    pageSize = pageSize || 10;

    var objs = [];
    for(var i = 0, len = pageSize; i < len; i++) {
      objs.push({
        id: i,
        name: 'bookmark ' + search + ' ' + (i+1),
        description: 'bookmark description ' + search + ' ' + (i+1),
        url: 'http://google.com'
      });
    }

    httpBackend.when('GET', 'rest/bookmarks/search/'+ search +'?page='+ page +'&size=' + pageSize)
        .respond(function(method, url, data) {

          data = {
            data: objs,
            count: objs.length,
            page: 1,
            pages: 1
          };

          return [200, angular.copy(data)];
        });
  }

  //----------------------------------------------------------------------------

  var location, ctrl, scope, rootScope, httpBackend, pagination;

  // excuted before each "it" is run
  beforeEach(function() {

    var ctrlName = 'BookmarksSearchCtrl';

    // load the module
    module('bookmarks');

    // inject dependencies
    inject(function(
      $location, $controller,
      $rootScope, $httpBackend,
      PaginationFactory
    ) {
      scope = $rootScope.$new();

      ctrl = $controller(ctrlName, {
        $scope: scope
      });

      location = $location;
      rootScope = $rootScope;
      httpBackend = $httpBackend;
      pagination = PaginationFactory.get(ctrlName);
    });

  });

  it('should be defined', function() {

    // assertions
    expect(ctrl).toBeDefined();

  });


  describe("options", function() {

    it("should show", function() {

      // act
      ctrl.showOptionsBtnClick();

      // assertions
      expect(ctrl.showOptions).toBeTruthy();
      expect(ctrl.optionsBtnLabel).toEqual('Hide Options');

    });

    it("should show options and filter", function() {

      // act
      ctrl.showFilterBtnActive = true;
      ctrl.showOptionsBtnClick();

      // assertions
      expect(ctrl.showOptions).toBeTruthy();
      expect(ctrl.optionsBtnLabel).toEqual('Hide Options');

    });

    it("should hide", function() {

      // act
      ctrl.showOptions = true;
      ctrl.showOptionsBtnClick();

      // assertions
      expect(ctrl.showOptions).toBeFalsy();
      expect(ctrl.optionsBtnLabel).toEqual('Show Options');

    });

    it("should hide options and filter", function() {

      // act
      ctrl.filter = { search: '' };
      ctrl.showFilter = true;
      ctrl.showOptions = true;
      ctrl.showOptionsBtnClick();

      // assertions
      expect(ctrl.showOptions).toBeFalsy();
      expect(ctrl.optionsBtnLabel).toEqual('Show Options');

    });

  });


  describe("filter", function() {

    it("should show", function() {

      // act
      ctrl.showFilterBtnClick();

      // assertions
      expect(ctrl.showFilter).toBeTruthy();
      expect(ctrl.filterBtnLabel).toEqual('Hide filter');

    });

    it("should hide", function() {

      // act
      ctrl.showFilter = true;
      ctrl.showFilterBtnClick();

      // assertions
      expect(ctrl.showFilter).toBeFalsy();
      expect(ctrl.filterBtnLabel).toEqual('Show filter');

    });

  });


  describe("update page size", function() {

    it("should be valid", function() {

      // arrange
      ctrl.pageMinSize = 5;
      ctrl.pageMaxSize = 100;

      // act and assertions
      expect(ctrl.updatePageSizeInvalid( 11 )).toBeFalsy();
      expect(ctrl.updatePageSizeInvalid( 6 )).toBeFalsy();
      expect(ctrl.updatePageSizeInvalid( 99 )).toBeFalsy();

    });

    it("should be invalid", function() {

      // arrange
      ctrl.pageMinSize = 5;
      ctrl.pageMaxSize = 100;

      // act and assertions
      expect(ctrl.updatePageSizeInvalid( undefined )).toBeTruthy();
      expect(ctrl.updatePageSizeInvalid( null )).toBeTruthy();
      expect(ctrl.updatePageSizeInvalid( 10 )).toBeTruthy();
      expect(ctrl.updatePageSizeInvalid( 2 )).toBeTruthy();
      expect(ctrl.updatePageSizeInvalid( 200 )).toBeTruthy();

    });

  });


  describe("updatePageSize form", function() {

    it("should submit", function() {

      // arrange
      var search = 'something';
      backendList(search, 1, 11);
      ctrl.pageMinSize = 5;
      ctrl.pageMaxSize = 100;

      // act
      ctrl.searchName = search;
      ctrl.pageSize = 11;
      ctrl.updatePageSizeFormSubmit();
      httpBackend.flush();

      // assertions
      expect(ctrl.currentPage).toEqual(1);
      expect(ctrl.result.data.length).toEqual(11);

    });

    it("should not submit", function() {

      // arrange
      ctrl.showFilter = true;
      ctrl.pageMinSize = 5;
      ctrl.pageMaxSize = 100;

      // act
      ctrl.pageSize = 200;
      ctrl.updatePageSizeFormSubmit();

      // assertions
      expect(ctrl.showFilter).toBeTruthy();

    });

  });


  describe("load data", function() {

    it("should not search", function() {

      // arrange
      ctrl.result = {
        message: 'nothing'
      };

      // act
      ctrl.searchName = '';
      ctrl.doSearch();

      // assertions
      expect(ctrl.result.message).toEqual('nothing');

    });

    it("should search google bookmarks", function() {

      // arrange
      var search = 'google';
      var matchFirstBookmarkName = 'bookmark ' + search + ' 1';
      backendList(search);

      // act
      ctrl.searchName = search;
      ctrl.doSearch();
      httpBackend.flush();

      // assertions
      expect(ctrl.currentPage).toEqual(1);
      expect(ctrl.result.data.length).toEqual(10);
      expect(ctrl.result.data[0].name).toEqual(matchFirstBookmarkName);

    });

    it("should update page size to 11", function() {

      var _pageSize = 11;

      // arrange
      var search = 'something';
      backendList(search, 1, _pageSize);

      // act
      ctrl.searchName = search;
      ctrl.pageSize = _pageSize;
      ctrl.updatePageSize();
      httpBackend.flush();

      // assertions
      expect(ctrl.currentPage).toEqual(1);
      expect(ctrl.result.data.length).toEqual(_pageSize);

    });

    it("should update page size to 12 and hide filter", function() {

      var _pageSize = 12;

      // arrange
      var search = 'something';
      backendList(search, 1, _pageSize);
      ctrl.showFilter = true;

      // act
      ctrl.searchName = search;
      ctrl.pageSize = _pageSize;
      ctrl.updatePageSize();
      httpBackend.flush();

      // assertions
      expect(ctrl.currentPage).toEqual(1);
      expect(ctrl.result.data.length).toEqual(_pageSize);
      expect(ctrl.showFilter).toBeFalsy();

    });

    it("should update page size to 13 and hide options", function() {

      var _pageSize = 13;

      // arrange
      var search = 'something';
      backendList(search, 1, _pageSize);
      ctrl.showFilterBtnActive = true;
      ctrl.showOptions = true;

      // act
      ctrl.searchName = search;
      ctrl.pageSize = _pageSize;
      ctrl.updatePageSize();
      httpBackend.flush();

      // assertions
      expect(ctrl.currentPage).toEqual(1);
      expect(ctrl.result.data.length).toEqual(_pageSize);
      expect(ctrl.showFilter).toBeFalsy();

    });

  });


  describe("pagination", function() {

    it("should change page", function() {

      // arrange
      ctrl.result = {
        page: 1
      };

      var objParams = {
        currentPage: 2
      };

      // act
      ctrl.pageChanged.call(objParams);

      // assertions
      expect(pagination.getNextPage()).toEqual(2);

    });

    it("should not change page", function() {

      // arrange
      ctrl.result = {
        page: 1
      };

      var objParams = {
        currentPage: 1
      };

      // act
      ctrl.pageChanged.call(objParams);

      // assertions
      expect(pagination.getNextPage()).toEqual(1);

    });

  });

});
