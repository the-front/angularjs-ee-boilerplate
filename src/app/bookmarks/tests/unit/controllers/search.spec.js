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
    expect(ctrl).toBeDefined(true);
  });


  describe("options", function() {

    it("should show", function() {

      // act
      scope.showOptionsBtnClick();

      // assertions
      expect(scope.showOptions).toBeTruthy();
      expect(scope.optionsBtnLabel).toEqual('Hide Options');

    });

    it("should show options and filter", function() {

      // act
      scope.showFilterBtnActive = true;
      scope.showOptionsBtnClick();

      // assertions
      expect(scope.showOptions).toBeTruthy();
      expect(scope.optionsBtnLabel).toEqual('Hide Options');

    });

    it("should hide", function() {

      // act
      scope.showOptions = true;
      scope.showOptionsBtnClick();

      // assertions
      expect(scope.showOptions).toBeFalsy();
      expect(scope.optionsBtnLabel).toEqual('Show Options');

    });

    it("should hide options and filter", function() {

      // act
      scope.filter = { search: '' };
      scope.showFilter = true;
      scope.showOptions = true;
      scope.showOptionsBtnClick();

      // assertions
      expect(scope.showOptions).toBeFalsy();
      expect(scope.optionsBtnLabel).toEqual('Show Options');

    });

  });


  describe("filter", function() {

    it("should show", function() {

      // act
      scope.showFilterBtnClick();

      // assertions
      expect(scope.showFilter).toBeTruthy();
      expect(scope.filterBtnLabel).toEqual('Hide filter');

    });

    it("should hide", function() {

      // act
      scope.showFilter = true;
      scope.showFilterBtnClick();

      // assertions
      expect(scope.showFilter).toBeFalsy();
      expect(scope.filterBtnLabel).toEqual('Show filter');

    });

  });


  describe("update page size", function() {

    it("should be valid", function() {
      // arrange
      scope.pageMinSize = 5;
      scope.pageMaxSize = 100;

      // act and assertions
      expect(scope.updatePageSizeInvalid( 11 )).toBeFalsy();
      expect(scope.updatePageSizeInvalid( 6 )).toBeFalsy();
      expect(scope.updatePageSizeInvalid( 99 )).toBeFalsy();

    });

    it("should be invalid", function() {
      // arrange
      scope.pageMinSize = 5;
      scope.pageMaxSize = 100;

      // act and assertions
      expect(scope.updatePageSizeInvalid( undefined )).toBeTruthy();
      expect(scope.updatePageSizeInvalid( null )).toBeTruthy();
      expect(scope.updatePageSizeInvalid( 10 )).toBeTruthy();
      expect(scope.updatePageSizeInvalid( 2 )).toBeTruthy();
      expect(scope.updatePageSizeInvalid( 200 )).toBeTruthy();

    });

  });


  describe("updatePageSize form", function() {

    it("should submit", function() {

      // arrange
      var search = 'something';
      backendList(search, 1, 11);
      scope.pageMinSize = 5;
      scope.pageMaxSize = 100;

      // act
      scope.searchName = search;
      scope.pageSize = 11;
      scope.updatePageSizeFormSubmit();
      httpBackend.flush();

      // assertions
      expect(scope.currentPage).toEqual(1);
      expect(scope.result.data.length).toEqual(11);

    });

    it("should not submit", function() {

      // arrange
      scope.showFilter = true;
      scope.pageMinSize = 5;
      scope.pageMaxSize = 100;

      // act
      scope.pageSize = 200;
      scope.updatePageSizeFormSubmit();

      // assertions
      expect(scope.showFilter).toBeTruthy();

    });

  });


  describe("load data", function() {

    it("should not search", function() {
      // arrange
      scope.result = {
        message: 'nothing'
      };

      // act
      scope.searchName = '';
      scope.doSearch();

      // assertions
      expect(scope.result.message).toEqual('nothing');
    });

    it("should search google bookmarks", function() {

      // arrange
      var search = 'google';
      var matchFirstBookmarkName = 'bookmark ' + search + ' 1';
      backendList(search);

      // act
      scope.searchName = search;
      scope.doSearch();
      httpBackend.flush();

      // assertions
      expect(scope.currentPage).toEqual(1);
      expect(scope.result.data.length).toEqual(10);
      expect(scope.result.data[0].name).toEqual(matchFirstBookmarkName);

    });

    it("should update page size to 11", function() {

      var _pageSize = 11;

      // arrange
      var search = 'something';
      backendList(search, 1, _pageSize);

      // act
      scope.searchName = search;
      scope.pageSize = _pageSize;
      scope.updatePageSize();
      httpBackend.flush();

      // assertions
      expect(scope.currentPage).toEqual(1);
      expect(scope.result.data.length).toEqual(_pageSize);

    });

    it("should update page size to 12 and hide filter", function() {

      var _pageSize = 12;

      // arrange
      var search = 'something';
      backendList(search, 1, _pageSize);
      scope.showFilter = true;

      // act
      scope.searchName = search;
      scope.pageSize = _pageSize;
      scope.updatePageSize();
      httpBackend.flush();

      // assertions
      expect(scope.currentPage).toEqual(1);
      expect(scope.result.data.length).toEqual(_pageSize);
      expect(scope.showFilter).toBeFalsy();

    });

    it("should update page size to 13 and hide options", function() {

      var _pageSize = 13;

      // arrange
      var search = 'something';
      backendList(search, 1, _pageSize);
      scope.showFilterBtnActive = true;
      scope.showOptions = true;

      // act
      scope.searchName = search;
      scope.pageSize = _pageSize;
      scope.updatePageSize();
      httpBackend.flush();

      // assertions
      expect(scope.currentPage).toEqual(1);
      expect(scope.result.data.length).toEqual(_pageSize);
      expect(scope.showFilter).toBeFalsy();

    });

  });


  describe("pagination", function() {

    it("should change page", function() {

      // arrange
      scope.result = {
        page: 1
      };

      var objParams = {
        currentPage: 2
      };

      // act
      scope.pageChanged.call(objParams);

      // assertions
      expect(pagination.getNextPage()).toEqual(2);

    });

    it("should not change page", function() {
      // arrange
      scope.result = {
        page: 1
      };

      var objParams = {
        currentPage: 1
      };

      // act
      scope.pageChanged.call(objParams);

      // assertions
      expect(pagination.getNextPage()).toEqual(1);

    });

  });

});
