describe('Testing Bookmarks Edit Controller', function() {

  var vm, scope, rootScope, httpBackend;

  // excuted before each "it" is run
  beforeEach(function() {

    // load the module
    module('bookmarks');

    // inject dependencies
    inject(function($rootScope, $stateParams, $controller, $httpBackend) {

      $stateParams.id = 1;
      scope = $rootScope.$new();

      vm = $controller('BookmarksEditCtrl', {
        $scope: scope
      });

      rootScope = $rootScope;
      httpBackend = $httpBackend;
    });

  });


  it('should be defined', function() {

    // assertions
    expect(vm).toBeDefined();

  });


  it("should have a title equals to 'Edit Bookmark : 1'", function() {

    // assertions
    expect(vm.title).toEqual('Edit Bookmark : 1');

  });


  it("should show delete confirm", function() {

    // act
    vm.remove();

    // assertions
    expect(vm.showConfirm).toBeTruthy();

  });


  it("should hide delete confirm", function() {

    // act
    vm.showConfirm = true;
    vm.cancelRemove();

    // assertions
    expect(scope.showConfirm).toBeFalsy();

  });


  describe("Edit bookmark", function() {

    beforeEach(function() {

      // arrange
      httpBackend.when('GET', 'rest/bookmarks/1')
        .respond(function(method, url, data) {
          data = {
            id: 1
          };
          return [201, data];
        });

      // act
      httpBackend.flush();

    });

    it("should get bookmark id : 1", function() {

      // assertions
      expect(vm.bookmark.id).toEqual(1);

    });

    it("should save bookmark changes", function() {

      // arrange
      httpBackend.when('PUT', 'rest/bookmarks/1')
        .respond(function(method, url, data) {
          data = {
            id: 1
          };
          return [201, data];
        });

      spyOn(rootScope, '$emit');

      // act
      vm.save();
      httpBackend.flush();

      // assertions
      expect(rootScope.$emit).toHaveBeenCalledWith('bookmarks:update:event', 'updated');

    });


    it("should delete bookmark", function() {

      // arrange
      httpBackend.when('DELETE', 'rest/bookmarks/1')
        .respond(function(method, url, data) {
          data = {
            id: 1
          };
          return [201, data];
        });

      spyOn(rootScope, '$emit');

      // act
      vm.destroy();
      httpBackend.flush();

      // assertions
      expect(rootScope.$emit).toHaveBeenCalledWith('bookmarks:remove:event', 'removed');

    });


  });


});
