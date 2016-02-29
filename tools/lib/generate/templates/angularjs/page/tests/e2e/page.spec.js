describe("e2e: home page", function() {
  var page = require('./page.object');

  beforeEach(function() {
    page.get();
  });

  it("should page name : '<%= helpers.capitalize( name ) %> Page'", function() {
    // assertions
    expect(page.pageName.getText()).toContain('<%= helpers.capitalize( name ) %> Page');
  });

});
