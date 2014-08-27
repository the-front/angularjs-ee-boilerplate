describe('Angular.js \'help\' Routes', function() {

  var route;

  beforeEach(function() {
    module('help');

    inject(function($route) {
      route = $route;
    });
  });

  /* only to check if injection work fine */
  it('should be defined', function() {
    expect(route).not.toEqual(null);
  });

  describe('Routes Map', function() {

    describe('location \'/help\'', function() {

      it('should be defined', function() {
        expect(route.routes['/help']).toBeDefined();
      });

      it('should map to controller HelpCtrl', function() {
        expect(route.routes['/help'].controller).toBe('HelpCtrl');
      });

      it('should map to templateUrl app/help/template.html', function() {
        expect(route.routes['/help'].templateUrl).toEqual('app/help/template.html');
      });

    });


  }); //--- end: Routes Map

});
