describe("Testing <%= helpers.capitalize( name ) %> Search Resource", function() {

  var resource;

  beforeEach(function() {

    // load the module
    module('<%= name %>');

    inject(function(<%= helpers.capitalize( name ) %>SearchResource) {
      resource = <%= helpers.capitalize( name ) %>SearchResource;
    });

  });


  it('should be defined', function() {
    expect(resource).toBeDefined(true);
  });

});
