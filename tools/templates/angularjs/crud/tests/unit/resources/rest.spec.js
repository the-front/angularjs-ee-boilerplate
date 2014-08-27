describe("Testing <%= helpers.capitalize( name ) %> Rest Resource", function() {

  var resource;

  beforeEach(function() {

    // load the module
    module('<%= name %>');

    inject(function(<%= helpers.capitalize( name ) %>Resource) {
      resource = <%= helpers.capitalize( name ) %>Resource;
    });

  });


  it('should be defined', function() {
    expect(resource).toBeDefined(true);
  });

});
