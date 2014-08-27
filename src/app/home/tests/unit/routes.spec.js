describe('Angular.js \'home\' Routes', function() {

  var route;

  beforeEach(function() {
    module('home');

    inject(function($route) {
      route = $route;
    });
  });

  /* only to check if injection work fine */
  it('should be defined', function() {
    expect(route).not.toEqual(null);
  });

  describe('Routes Map', function() {

    describe('location \'/\'', function() {

      it('should be defined', function() {
        expect(route.routes['/']).toBeDefined();
      });

      it('should map to controller HomeCtrl', function() {
        expect(route.routes['/'].controller).toBe('HomeCtrl');
      });

      it('should map to templateUrl app/home/template.html', function() {
        expect(route.routes['/'].templateUrl).toEqual('app/home/template.html');
      });

    });


  }); //--- end: Routes Map

});
