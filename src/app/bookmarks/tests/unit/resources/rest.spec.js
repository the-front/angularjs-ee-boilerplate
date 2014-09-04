describe("Testing Bookmarks Rest Resource", function() {

  var resource;

  // excuted before each "it" is run
  beforeEach(function() {

    // load the module
    module('bookmarks');

    // inject dependencies
    inject(function(BookmarksResource) {
      resource = BookmarksResource;
    });

  });


  it('should be defined', function() {

    // assertions
    expect(resource).toBeDefined();

  });

});
