describe("e2e: about page", function() {
  var page = require('./about.po');

  beforeEach(function() {
    page.get();
    browser.sleep(200);
  });

  it("should page name : 'About Page'", function() {
    // assertions
    expect(page.pageName.getText()).toContain('About Page');
  });

});
