describe("Testing Bookmarks Search Resource", function() {

  var resource;

  // excuted before each "it" is run
  beforeEach(function() {

    // load the module
    module('bookmarks');

    // inject dependencies
    inject(function(BookmarksSearchResource) {
      resource = BookmarksSearchResource;
    });

  });


  it('should be defined', function() {

    // assertions
    expect(resource).toBeDefined();

  });

});
