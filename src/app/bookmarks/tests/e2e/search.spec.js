
// grunt protractor --suite bookmarks

describe("e2e: bookmarks on search", function() {
  var page = require('./page.object');

  //---

  var backToList = page.on.search.links.backToList(); // get element
  var optionsButton = page.on.search.options.optionsButton(); // get element

  var searchInput = page.on.search.searchInput(); // get element

  var repeater = page.on.table.repeater(); // get element

  //---

  beforeEach(function() {
    page.get();

    page.on.list.links.search().click();
  });

  //---

  it("should have go back link", function() {
    // assertions
    expect(backToList.isPresent()).toBeTruthy();
  });

  it("should show options", function() {
    // assert
    expect(optionsButton.getText()).toContain('Show Options');

    // act
    optionsButton.click();

    // assert
    expect(optionsButton.getText()).toContain('Hide Options');
  });

  //---

  describe("do 'protractor' search", function() {

    beforeEach(function() {
      searchInput
        .sendKeys('protractor')
        .sendKeys('\n'); // submit form
    });

    it("should find 'protractor'", function() {
      expect(repeater.count()).toBe(3);
    });

    it("should change page size length to 2", function() {
      // open options
      optionsButton.click();

      var pageSizeInput = page.on.search.options.pageSizeInput(); // get element

      pageSizeInput.clear();
      pageSizeInput
        .sendKeys(2)
        .sendKeys('\n'); // submit form

      expect(repeater.count()).toBe(2);

    });

  });

});
