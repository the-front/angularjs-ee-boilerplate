describe("Testing fend.navbar MenuConfig Factory", function() {

  var rootScope, location, menu;

  // excuted before each "it" is run
  beforeEach(function() {

    // load the module
    module('fend.navbar');

    // inject dependencies
    inject(function($rootScope, $location, MenuConfig) {

      rootScope = $rootScope;

      location = $location;

      menu = MenuConfig;

    });

  });


  it("should be registered", function() {

    // assertions
    expect(menu).toBeDefined();

  });

  it("should config menu", function() {

    // act
    menu.addMenuItem('Home', '');
    menu.addMenuItem('UC1', 'uc1');
    menu.addMenuItem('UC2', 'uc2');
    menu.addMenuItem('Help', 'help', 'right');

    // assertions
    expect(rootScope.menuItems).toBeDefined();
    expect(rootScope.menuItems.left.length).toEqual(3);
    expect(rootScope.menuItems.right.length).toEqual(1);

  });

  describe("change location", function() {

    beforeEach(function() {

      // arrange
      menu.addMenuItem('Home', '');
      menu.addMenuItem('UC1', 'uc1');
      menu.addMenuItem('UC2', 'uc2');

    });

    it("should select UC1 menu item", function() {

      // act
      location.path('/uc1');
      rootScope.$digest();

      // assertions
      expect(rootScope.menuItems.left[1].css).toEqual('active');

    });

    it("should select UC2 menu item", function() {

      // act
      location.path('/uc2/new');
      rootScope.$digest();

      // assertions
      expect(rootScope.menuItems.left[2].css).toEqual('active');

    });

    it("should UC2 menu item stay selected", function() {

      // act
      location.path('/uc2');
      rootScope.$digest();
      location.path('/uc2/new');
      rootScope.$digest();

      // assertions
      expect(rootScope.menuItems.left[2].css).toEqual('active');

    });

    it("should change menu item selected", function() {

      // act
      location.path('/uc1');
      rootScope.$digest();
      location.path('/uc2');
      rootScope.$digest();

      // assertions
      expect(rootScope.menuItems.left[1].css).toEqual('');
      expect(rootScope.menuItems.left[2].css).toEqual('active');

    });

    it("should unselect UC2 menu item", function() {

      // act
      location.path('/uc2');
      rootScope.$digest();
      location.path('/undefined');
      rootScope.$digest();

      // assertions
      expect(rootScope.menuItems.left[2].css).toEqual('');

    });

    it("should not select none menu item", function() {

      // act
      location.path('/undefined');
      rootScope.$digest();

      // assertions
      expect(rootScope.menuItems.left[0].css).toEqual('');
      expect(rootScope.menuItems.left[1].css).toEqual('');
      expect(rootScope.menuItems.left[2].css).toEqual('');

    });

  });

});
