describe('Testing <%= helpers.capitalize( name ) %> Controller', function() {

  var vm;

  // excuted before each "it" is run
  beforeEach(function() {

    // load the module
    module('<%= name %>');

    // inject dependencies
    inject(function($controller) {

      vm = $controller('<%= helpers.capitalize( name ) %>Ctrl');

    });

  });


  it('should have a pageName equals to \'<%= helpers.capitalize( name ) %> Page\'', function() {

    // assertions
    expect(vm.pageName).toEqual('<%= helpers.capitalize( name ) %> Page');

  });

});
