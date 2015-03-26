describe("Testing <%= helpers.capitalize( name ) %> Search Resource", function() {

  var resource;

  // excuted before each "it" is run
  beforeEach(function() {

    // load the module
    module('<%= name %>');

    // inject dependencies
    inject(function(<%= helpers.capitalize( name ) %>SearchResource) {
      resource = <%= helpers.capitalize( name ) %>SearchResource;
    });

  });


  it('should be defined', function() {

    // assertions
    expect(resource).toBeDefined();

  });

});
