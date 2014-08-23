describe('Angular.js \'bookmarks\' Routes', function() {

  var route;

  beforeEach(function() {
    module('bookmarks');

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


    describe('location \'/bookmarks\' - list booksmarks', function() {

      it('should be defined', function() {
        expect(route.routes['/bookmarks']).toBeDefined();
      });

      it('should map to controller BookmarksListCtrl', function() {
        expect(route.routes['/bookmarks'].controller).toBe('BookmarksListCtrl');
      });

      it('should map to templateUrl app/bookmarks/templates/list.html', function() {
        expect(route.routes['/bookmarks'].templateUrl).toEqual('app/bookmarks/templates/list.html');
      });

    });


    describe('location \'/bookmarks/search\' - search booksmarks', function() {

      it('should be defined', function() {
        expect(route.routes['/bookmarks/search']).toBeDefined();
      });

      it('should map to controller BookmarksSearchCtrl', function() {
        expect(route.routes['/bookmarks/search'].controller).toBe('BookmarksSearchCtrl');
      });

      it('should map to templateUrl app/bookmarks/templates/search.html', function() {
        expect(route.routes['/bookmarks/search'].templateUrl).toEqual('app/bookmarks/templates/search.html');
      });

    });


    describe('location \'/bookmarks/new\' - add new booksmark', function() {

      it('should be defined', function() {
        expect(route.routes['/bookmarks/new']).toBeDefined();
      });

      it('should map to controller BookmarksNewCtrl', function() {
        expect(route.routes['/bookmarks/new'].controller).toBe('BookmarksNewCtrl');
      });

      it('should map to templateUrl app/bookmarks/templates/form.html', function() {
        expect(route.routes['/bookmarks/new'].templateUrl).toEqual('app/bookmarks/templates/form.html');
      });

    });

    describe('location \'/bookmarks/edit/:id\' - add new booksmark', function() {

      it('should be defined', function() {
        expect(route.routes['/bookmarks/edit/:id']).toBeDefined();
      });

      it('should map to controller BookmarksEditCtrl', function() {
        expect(route.routes['/bookmarks/edit/:id'].controller).toBe('BookmarksEditCtrl');
      });

      it('should map to templateUrl app/bookmarks/templates/form.html', function() {
        expect(route.routes['/bookmarks/edit/:id'].templateUrl).toEqual('app/bookmarks/templates/form.html');
      });

    });


  }); //--- end: Routes Map

});
