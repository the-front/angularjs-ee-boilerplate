describe("e2e: about page", function() {
  var page = require('./page.object');

  beforeEach(function() {
    page.get();
  });

  it("should page name : 'About Page'", function() {
    // assertions
    expect(page.pageName.getText()).toContain('About Page');
  });

});
