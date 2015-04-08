describe('Testing <%= helpers.capitalize( name ) %> Edit Controller', function() {

  var vm, scope, rootScope, httpBackend;

  // excuted before each "it" is run
  beforeEach(function() {

    // load the module
    module('<%= name %>');

    // inject dependencies
    inject(function($rootScope, $stateParams, $controller, $httpBackend) {

      $stateParams.id = 1;
      scope = $rootScope.$new();

      vm = $controller('<%= helpers.capitalize( name ) %>EditCtrl', {
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


  it("should have a title equals to 'Edit <%= helpers.capitalize( name ) %> : 1'", function() {

    // assertions
    expect(vm.title).toEqual('Edit <%= helpers.capitalize( name ) %> : 1');

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
    expect(vm.showConfirm).toBeFalsy();

  });


  describe("Edit <%= name %>", function() {

    beforeEach(function() {

      // arrange
      httpBackend.when('GET', '<%= endpoint %>/1')
        .respond(function(method, url, data) {
          data = {
            id: 1
          };
          return [201, data];
        });

      // act
      httpBackend.flush();

    });

    it("should get <%= helpers.capitalize( name ) %> id : 1", function() {

      // assertions
      expect(vm.<%= name %>.id).toEqual(1);

    });

    it("should save <%= helpers.capitalize( name ) %> changes", function() {

      // arrange
      httpBackend.when('PUT', '<%= endpoint %>/1')
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
      expect(rootScope.$emit).toHaveBeenCalledWith('<%= name %>:update:event', 'updated');

    });


    it("should delete <%= helpers.capitalize( name ) %>", function() {

      // arrange
      httpBackend.when('DELETE', '<%= endpoint %>/1')
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
      expect(rootScope.$emit).toHaveBeenCalledWith('<%= name %>:remove:event', 'removed');

    });


  });


});
