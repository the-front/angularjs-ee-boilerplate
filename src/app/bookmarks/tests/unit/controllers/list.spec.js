describe('Testing Bookmarks List Controller', function() {

  function backendList(page, pageSize) {
    page = page || 1;
    pageSize = pageSize || 10;

    var objs = [];
    for(var i = 0, len = pageSize; i < len; i++) {
      objs.push({
        id: i,
        name: 'bookmark ' + (i+1),
        description: 'bookmark description ' + (i+1),
        url: 'http://google.com'
      });
    }

    httpBackend.when('GET', 'rest/bookmarks?page='+ page +'&size=' + pageSize)
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

    var ctrlName = 'BookmarksListCtrl';

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


  /*
  it("should change location to '/new/path'", function() {

    // arrange
    spyOn(location, 'path');

    // act
    location.path('/new/path');

    // assertions
    expect(location.path).toHaveBeenCalledWith('/new/path');

  });
  */


  describe("event handlers", function() {

    beforeEach(function() {

      // arrange
      spyOn(location, 'path');

      backendList();

    });

    it("should handle 'bookmarks:add:event'", function() {

      // act
      rootScope.$emit('bookmarks:add:event', 'added');

      // assertions
      expect(location.path).toHaveBeenCalledWith('/bookmarks');

    });


    it("should handle 'bookmarks:update:event'", function() {

      // act
      rootScope.$emit('bookmarks:update:event', 'updated');

      // assertions
      expect(location.path).toHaveBeenCalledWith('/bookmarks');

    });


    it("should handle 'bookmarks:remove:event'", function() {

      // act
      rootScope.$emit('bookmarks:remove:event', 'removed');

      // assertions
      expect(location.path).toHaveBeenCalledWith('/bookmarks');

    });

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
      backendList();
      backendList(1, 11);
      scope.pageMinSize = 5;
      scope.pageMaxSize = 100;

      // act
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

    beforeEach(function() {

      // arrange
      backendList();

      // act
      httpBackend.flush();

    });

    it("should load first default page", function() {

      // assertions
      expect(scope.currentPage).toEqual(1);
      expect(scope.result.data.length).toEqual(10);

    });


    it("should update page size to 11", function() {

      var _pageSize = 11;

      // arrange
      backendList(1, _pageSize);

      // act
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
      backendList(1, _pageSize);
      scope.showFilter = true;

      // act
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
      backendList(1, _pageSize);
      scope.showFilterBtnActive = true;
      scope.showOptions = true;

      // act
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
