describe("e2e: <%= helpers.capitalize( name ) %> on list", function() {
  var page = require('./page.object');

  beforeEach(function() {
    page.get();
  });

  //---

  it("should have Search and New links", function() {
    // arrange
    var searchLink = page.on.list.links.search(); // get element
    var newLink = page.on.list.links.new(); // get element
    var optionsButton = page.on.list.options.optionsButton(); // get element

    // assertions
    expect(searchLink.isPresent()).toBeTruthy();
    expect(newLink.isPresent()).toBeTruthy();
    expect(optionsButton.isPresent()).toBeTruthy();
  });

  it("should have more then one item", function() {
    // arrange
    var repeater = page.on.table.repeater(); // get element

    // assetions
    expect(repeater.count()).toBeGreaterThan(1);
  });


  describe("options", function() {
    var optionsButton = page.on.list.options.optionsButton(); // get element

    it("should show", function() {
      // assert
      expect(optionsButton.getText()).toContain('Show Options');

      // act
      optionsButton.click();

      // assert
      expect(optionsButton.getText()).toContain('Hide Options');
    });

    describe("page size", function() {
      var pageSizeInput = page.on.list.options.pageSizeInput(); // get element

      beforeEach(function() {
        optionsButton.click();
      });

      it("should not change", function() {
        // act
        pageSizeInput.clear();
        pageSizeInput.sendKeys(1);

        // shortcut
        var pageSizeMessage = page.on.list.options.pageSizeMessage(); // get element

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
        var repeater = page.on.table.repeater(); // get element

        // assert
        expect(repeater.count()).toBe(2);
      });

    }); // end: page size

    describe("filter", function() {
      var filterButton = page.on.list.options.filterButton(); // get element

      beforeEach(function() {
        optionsButton.click();
      });

      it("should show", function() {
        // assert
        expect(filterButton.getText()).toContain('Show filter');

        // act
        filterButton.click();

        // assert
        expect(filterButton.getText()).toContain('Hide filter');
      });

      // test all filter behave
      it("should do filter", function() {
        var filterTexts, filterInput, filterClearButton, repeater;

        filterButton.click(); // show filter

        repeater = page.on.table.repeater(); // get element
        expect(repeater.count()).toBe(10); // initial itens length

        filterInput = page.on.table.filterInput(); // get element
        filterInput.sendKeys('protractor'); // apply filter

        expect(repeater.count()).toBe(3); // itens length after apply filter

        filterTexts = page.on.table.filterTexts(); // get elements
        expect(filterTexts.count()).toBe(1);

        filterClearButton = page.on.table.filterClearButton(); // get element
        filterClearButton.click();

        expect(repeater.count()).toBe(10); // return to initial itens length

        filterTexts = page.on.table.filterTexts(); // get elements
        expect(filterTexts.count()).toBe(0); // initial stage

        filterInput.sendKeys('protractor'); // apply filter
        optionsButton.click(); // hide options

        filterTexts = page.on.table.filterTexts(); // get elements
        expect(filterTexts.count()).toBe(2);

        optionsButton.click(); // show options
        expect(filterButton.getText()).toContain('Hide filter');
      });

    }); // end: filter

  }); // end: options

});
