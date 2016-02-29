describe("Testing <%= helpers.capitalize( name ) %> Rest Resource", function() {

  var resource;

  // excuted before each "it" is run
  beforeEach(function() {

    // load the module
    module('<%= name %>');

    // inject dependencies
    inject(function(<%= helpers.capitalize( name ) %>Resource) {
      resource = <%= helpers.capitalize( name ) %>Resource;
    });

  });


  it('should be defined', function() {

    // assertions
    expect(resource).toBeDefined();

  });

});
