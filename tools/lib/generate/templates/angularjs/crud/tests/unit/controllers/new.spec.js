describe('Testing <%= helpers.capitalize( name ) %> New Controller', function() {

  var httpBackend, vm, rootScope, scope;

  // excuted before each "it" is run
  beforeEach(function() {

    // load the module
    module('<%= name %>');

    // inject dependencies
    inject(function($controller, $rootScope, $httpBackend) {
      scope = $rootScope.$new();

      vm = $controller('<%= helpers.capitalize( name ) %>NewCtrl', {
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

  it("should have a title equals to 'New <%= helpers.capitalize( name ) %>'", function() {

    // assertions
    expect(vm.title).toEqual('New <%= helpers.capitalize( name ) %>');

  });

  it("should have empty <%= name %> object", function() {

    // assertions
    expect(vm.<%= name %>.id).toEqual(0);
    expect(vm.<%= name %>.name).toEqual('');

  });

  it("should save", function() {

    // arrange
    httpBackend.when('POST', '<%= endpoint %>')
      .respond(function(method, url, data) {
        data = angular.fromJson(data);
        data.id = 1;
        return [201, angular.copy(data)];
      });

    spyOn(rootScope, '$emit');

    // act
    vm.save();
    httpBackend.flush();

    // assertions
    expect(rootScope.$emit).toHaveBeenCalledWith('<%= name %>:add:event', 'added');

  });


});
