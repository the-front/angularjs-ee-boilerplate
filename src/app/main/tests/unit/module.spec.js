describe('Angular.js \'main\' Module', function() {

  var module;

  // excuted before each "it" is run
  beforeEach(function() {

    // load the module
    module = angular.module('main');

  });

  it("should be registered", function() {

    // assertions
    expect(module).toBeDefined();

  });

  describe("Dependencies:", function() {

    var deps;

    var hasModule = function(m) {
      return deps.indexOf(m) >= 0;
    };

    beforeEach(function() {
      deps = module.value('appName').requires;
    });

    var mainDeps = [
      'ui.router',
      'ui.bootstrap',

      'templatesCache',

      'fend.progressbar.loading',
      'fend.navbar',

      'home',
      'about',

      'bookmarks',

      'help'
    ];

    mainDeps.forEach(function( depName ) {

      it('should have ' + depName +  ' as a dependency', function() {

        // assertions
        expect(hasModule( depName )).toEqual(true);

      });

    });

  });

});
