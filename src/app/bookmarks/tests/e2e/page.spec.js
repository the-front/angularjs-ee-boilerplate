
// grunt protractor --suite bookmarks

describe("e2e: bookmarks", function() {
  var page = require('./page.object');

  beforeEach(function() {
    page.get();
  });

  describe("on list", function() {

    it("should have Search and New links", function() {
      // arrange
      var searchLink = page.on.list.links.search();
      var newLink = page.on.list.links.new();
      var optionsButton = page.on.list.options.optionsButton();

      // assertions
      expect(searchLink.isPresent()).toBeTruthy();
      expect(newLink.isPresent()).toBeTruthy();
      expect(optionsButton.isPresent()).toBeTruthy();
    });

    it("should have more then one item", function() {
      // arrange
      var repeater = page.on.table.repeater();

      // assetions
      expect(repeater.count()).toBeGreaterThan(1);
    });


    describe("options", function() {
      var optionsButton = page.on.list.options.optionsButton();

      it("should show", function() {
        // assert
        expect(optionsButton.getText()).toContain('Show Options');

        // act
        optionsButton.click();

        // assert
        expect(optionsButton.getText()).toContain('Hide Options');
      });

      describe("page size", function() {
        var pageSizeInput = page.on.list.options.pageSizeInput();

        beforeEach(function() {
          optionsButton.click();
        });

        it("should not change", function() {
          // act
          pageSizeInput.clear();
          pageSizeInput.sendKeys(1);

          // shortcut
          var pageSizeMessage = page.on.list.options.pageSizeMessage();

          // assert
          expect(pageSizeMessage.getText()).toContain('The value must be in range');

        });

        it("should change", function() {
          // act
          pageSizeInput.clear();
          pageSizeInput
            .sendKeys(2)
            .sendKeys('\n'); // submit form

          // shortcut
          var repeater = page.on.table.repeater();

          // assert
          expect(repeater.count()).toBe(2);
        });

      }); // end: page size

      describe("filter", function() {

        beforeEach(function() {
          optionsButton.click();
        });

        // TODO: define test's

      }); // end: filter

    }); // end: options

  }); // end: on list

  describe("on search", function() {
    var seachLink = page.on.list.links.search();

    beforeEach(function() {
      // act
      seachLink.click();
    });

    it("should have go back link", function() {
      // arrange
      var backToList = page.on.search.links.backToList();

      // assertions
      expect(backToList.isPresent()).toBeTruthy();
    });

  }); // end: on search


  // TODO: test on add new

  // TODO: test on edit one


});
