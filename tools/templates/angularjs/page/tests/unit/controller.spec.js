describe('Testing <%= helpers.capitalize( name ) %> Controller', function() {

  var ctrl, scope;

  // excuted before each "it" is run
  beforeEach(function() {

    // load the module
    module('<%= name %>');

    // inject dependencies
    inject(function($controller, $rootScope) {
      scope = $rootScope.$new();

      ctrl = $controller('<%= helpers.capitalize( name ) %>Ctrl', {
        $scope: scope
      });
    });

  });


  it('should have a pageName equals to \'<%= helpers.capitalize( name ) %> Page\'', function() {

    // assertions
    expect(scope.pageName).toEqual('<%= helpers.capitalize( name ) %> Page');

  });

});
