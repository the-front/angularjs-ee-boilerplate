describe('Angular.js \'home\' Routes', function() {

  var route;

  // excuted before each "it" is run
  beforeEach(function() {

    // load the module
    module('home');

    // inject dependencies
    inject(function($route) {
      route = $route;
    });

  });

  /* only to check if injection work fine */
  it('should be defined', function() {

    // assertions
    expect(route).toBeDefined();

  });

  describe('Routes Map', function() {

    describe('location \'/\'', function() {

      it('should be defined', function() {

        // assertions
        expect(route.routes['/']).toBeDefined();

      });

      it('should map to controller HomeCtrl as vm', function() {

        var check = route.routes['/'];

        // assertions
        expect(check.controller).toBe('HomeCtrl');
        expect(check.controllerAs).toBe('vm');

      });

      it('should map to templateUrl app/home/template.html', function() {

        // assertions
        expect(route.routes['/'].templateUrl).toEqual('app/home/template.html');

      });

    });


  }); //--- end: Routes Map

});
