describe("e2e: help page", function() {
  var page = require('./page.object');

  beforeEach(function() {
    page.get();
  });

  it("should page name : 'Help Page'", function() {
    // assertions
    expect(page.pageName.getText()).toContain('Help Page');
  });

  it("should githubUser be present", function() {
    expect(page.githubUser.isPresent()).toBeTruthy();
  });

});
