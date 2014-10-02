describe("e2e: home page", function() {
  var page = require('./page.object');

  beforeEach(function() {
    page.get();
  });

  it("should page name : 'Home Page'", function() {
    // assertions
    expect(page.pageName.getText()).toContain('Home Page');
  });

});
