describe('Angular.js \'main\' Routes', function() {

  var route;

  // excuted before each "it" is run
  beforeEach(function() {

    // load the module
    module('main');

    // inject dependencies
    inject(function($route) {
      route = $route;
    });

  });

  /* only to check if injection work fine */
  it('should be defined', function() {

    expect(route).toBeDefined();

  });

  describe('Routes Map', function() {

    describe('location \'/404\'', function() {

      it('should be defined', function() {
        expect(route.routes['/404']).toBeDefined();
      });

      it('should map to templateUrl app/main/templates/404.html', function() {
        expect(route.routes['/404'].templateUrl).toEqual('app/main/templates/404.html');
      });

    });

    describe('otherwise is the empty string', function() {

      it('should redirect to location \'/404\'', function() {
        expect(route.routes[null].redirectTo).toEqual('/404');
      });

    });

  }); //--- end: Routes Map

});
