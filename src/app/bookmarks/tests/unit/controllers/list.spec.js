describe('Testing Bookmarks List Controller', function() {

  var ctrl, scope;

  // excuted before each "it" is run
  beforeEach(function() {

    // load the module
    module('bookmarks');

    // inject dependencies
    inject(function($controller, $rootScope) {
      scope = $rootScope.$new();

      ctrl = $controller('BookmarksListCtrl', {
        $scope: scope
      });
    });

  });

  it('should be defined', function() {
    expect(ctrl).toBeDefined(true);
  });

  // TODO: define test's

});
