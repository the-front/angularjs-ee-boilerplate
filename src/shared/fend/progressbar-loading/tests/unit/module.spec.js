describe('Angular.js \'fend.progressbar.loading\' Module', function() {

  var module;

  beforeEach(function() {
    module = angular.module('fend.progressbar.loading');
  });

  it("should be registered", function() {
    expect(module).not.toEqual(null);
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
      'ngProgress'
    ];

    mainDeps.forEach(function( depName ) {
      it('should have ' + depName +  ' as a dependency', function() {
        expect(hasModule( depName )).toEqual(true);
      });
    });

  });


});
