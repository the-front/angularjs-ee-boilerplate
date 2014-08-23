describe("Testing Bookmarks Rest Resource", function() {

  var resource;

  beforeEach(function() {

    // load the module
    module('bookmarks');

    inject(function(BookmarksResource) {
      resource = BookmarksResource;
    });

  });


  it('should be defined', function() {
    expect(resource).toBeDefined(true);
  });

});
