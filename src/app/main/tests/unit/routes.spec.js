describe('Angular.js \'main\' Routes', function() {

  var route;

  beforeEach(function() {
    module('main');

    inject(function($route) {
      route = $route;
    });
  });

  /* only to check if injection work fine
  it('$route should be defined', function() {
    expect(route).not.toEqual(null);
  });
  */

  describe('Routes Map', function() {

    /* only to check if injection work fine
    it('$route should be present', function() {
      expect(route).not.toEqual(null);
    });
    */

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
