describe('Testing <%= helpers.capitalize( name ) %> New Controller', function() {

  var httpBackend, ctrl, rootScope, scope;

  // excuted before each "it" is run
  beforeEach(function() {

    // load the module
    module('<%= name %>');

    // inject dependencies
    inject(function($controller, $rootScope, $httpBackend) {
      scope = $rootScope.$new();

      ctrl = $controller('<%= helpers.capitalize( name ) %>NewCtrl', {
        $scope: scope
      });

      rootScope = $rootScope;
      httpBackend = $httpBackend;
    });

  });


  it('should be defined', function() {
    expect(ctrl).toBeDefined(true);
  });

  it("should have a title equals to 'New <%= helpers.capitalize( name ) %>'", function() {
    expect(scope.title).toEqual('New <%= helpers.capitalize( name ) %>');
  });

  it("should have empty <%= name %> object", function() {
    expect(scope.<%= name %>.id).toEqual(0);
    expect(scope.<%= name %>.name).toEqual('');
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
    scope.save();
    httpBackend.flush();

    // assertions
    expect(rootScope.$emit).toHaveBeenCalledWith('<%= name %>:add:event', 'added');

  });


});
