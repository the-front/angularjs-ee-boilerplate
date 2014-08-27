describe('Angular.js \'about\' Routes', function() {

  var route;

  beforeEach(function() {
    module('about');

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


    describe('location \'/about\'', function() {

      it('should be defined', function() {
        expect(route.routes['/about']).toBeDefined();
      });

      it('should map to controller AboutCtrl', function() {
        expect(route.routes['/about'].controller).toBe('AboutCtrl');
      });

      it('should map to templateUrl app/about/templates/page.html', function() {
        expect(route.routes['/about'].templateUrl).toEqual('app/about/templates/page.html');
      });

    });


  }); //--- end: Routes Map

});
