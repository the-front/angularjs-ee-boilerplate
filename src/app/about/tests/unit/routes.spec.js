describe('Angular.js \'about\' Routes', function() {

  var route;

  // excuted before each "it" is run
  beforeEach(function() {

    // load the module
    module('about');

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

    describe('location \'/about\'', function() {

      it('should be defined', function() {

        // assertions
        expect(route.routes['/about']).toBeDefined();

      });

      it('should map to controller AboutCtrl', function() {

        // assertions
        expect(route.routes['/about'].controller).toBe('AboutCtrl');

      });

      it('should map to templateUrl app/about/templates/page.html', function() {

        // assertions
        expect(route.routes['/about'].templateUrl).toEqual('app/about/templates/page.html');

      });

    });


  }); //--- end: Routes Map

});
