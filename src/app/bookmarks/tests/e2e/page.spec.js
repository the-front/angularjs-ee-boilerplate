// grunt protractor --suite bookmarks

describe("e2e: bookmarks", function() {
  var page = require('./page.object');

  beforeEach(function() {
    page.get();
  });

  describe("on list", function() {

    it("should have Search and New links", function() {
      // assertions
      expect(page.on.list.links.search().isPresent()).toBeTruthy();
      expect(page.on.list.links.new().isPresent()).toBeTruthy();
    });

  });

  describe("on search", function() {

    beforeEach(function() {
      // act
      page.on.list.links.search().click();
    });

    it("should have go back link", function() {
      // assertions
      expect(page.on.search.links.backToList().isPresent()).toBeTruthy();
    });

  });


});
