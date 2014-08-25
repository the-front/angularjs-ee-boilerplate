describe('Testing Bookmarks List Controller', function() {

  var location, ctrl, scope, rootScope, httpBackend;

  // excuted before each "it" is run
  beforeEach(function() {

    // load the module
    module('bookmarks');

    // inject dependencies
    inject(function($location, $controller, $rootScope, $httpBackend) {
      scope = $rootScope.$new();

      ctrl = $controller('BookmarksListCtrl', {
        $scope: scope
      });

      location = $location;
      rootScope = $rootScope;
      httpBackend = $httpBackend;
    });

  });

  it('should be defined', function() {
    expect(ctrl).toBeDefined(true);
  });


  it("should change location to '/new/path'", function() {
    // arrange
    spyOn(location, 'path');

    // act
    location.path('/new/path');

    //  assertions
    expect(location.path).toHaveBeenCalledWith('/new/path');
  });


  describe("event handlers", function() {

    beforeEach(function() {

      // arrange
      spyOn(location, 'path');

      httpBackend.when('GET', 'rest/bookmarks?page=1&size=10')
        .respond(function(method, url, data) {
          data = {
            data: [],
            count: 0,
            page: 1,
            pages: 1
          };
          return [200, angular.copy(data)];
        });

    });

    it("should handle 'bookmarks:add:event'", function() {

      // act
      rootScope.$emit('bookmarks:add:event', 'added');

      //  assertions
      expect(location.path).toHaveBeenCalledWith('/bookmarks');

    });


    it("should handle 'bookmarks:update:event'", function() {

      // act
      rootScope.$emit('bookmarks:update:event', 'updated');

      //  assertions
      expect(location.path).toHaveBeenCalledWith('/bookmarks');

    });


    it("should handle 'bookmarks:remove:event'", function() {

      // act
      rootScope.$emit('bookmarks:remove:event', 'removed');

      //  assertions
      expect(location.path).toHaveBeenCalledWith('/bookmarks');

    });

  });



  // TODO: define test's

});
