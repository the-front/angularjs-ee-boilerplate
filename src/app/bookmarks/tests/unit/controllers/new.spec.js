describe('Testing Bookmarks New Controller', function() {

  var httpBackend, ctrl, rootScope, scope;

  // excuted before each "it" is run
  beforeEach(function() {

    // load the module
    module('bookmarks');

    // inject dependencies
    inject(function($controller, $rootScope, $httpBackend) {
      scope = $rootScope.$new();

      ctrl = $controller('BookmarksNewCtrl', {
        $scope: scope
      });

      rootScope = $rootScope;
      httpBackend = $httpBackend;
    });

  });


  it('should be defined', function() {

    // assertions
    expect(ctrl).toBeDefined();

  });

  it("should have a title equals to 'New Bookmark'", function() {

    // assertions
    expect(scope.title).toEqual('New Bookmark');

  });

  it("should have empty bookmark object", function() {

    // assertions
    expect(scope.bookmark.id).toEqual(0);
    expect(scope.bookmark.name).toEqual('');

  });

  it("should save", function() {

    // arrange
    httpBackend.when('POST', 'rest/bookmarks')
      .respond(function(method, url, data) {
        data = angular.fromJson(data);
        data.id = 1;
        return [201, angular.copy(data)];
      });

    spyOn(rootScope, '$emit');

    // act
    scope.save();
    httpBackend.flush();

    // assertions
    expect(rootScope.$emit).toHaveBeenCalledWith('bookmarks:add:event', 'added');

  });


});
