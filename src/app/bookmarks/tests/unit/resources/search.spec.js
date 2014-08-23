describe("Testing Bookmarks Search Resource", function() {

  var resource;

  beforeEach(function() {

    // load the module
    module('bookmarks');

    inject(function(BookmarksSearchResource) {
      resource = BookmarksSearchResource;
    });

  });


  it('should be defined', function() {
    expect(resource).toBeDefined(true);
  });

});
