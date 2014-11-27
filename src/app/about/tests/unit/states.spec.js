describe('ui.router: \'about\'', function() {

  var state;

  // excuted before each "it" is run
  beforeEach(function() {

    // load the module
    module('about');

    // inject dependencies
    inject(function($state) {
      state = $state;
    });

  });

  describe("States Map", function() {

    it("$state should be defined", function() {
      expect(state).toBeDefined();
    });

    describe("about state", function() {

      var config;

      it("should be defined", function() {
        // arrange
        config = state.get('about');

        // assertions
        expect(config).toBeDefined();
      });

      it("should map to url \'/about\'", function() {
        expect(config.url).toEqual('/about');
      });

      describe("views", function() {

        var views;

        it("should be defined", function() {
          // arrange
          views = config.views;

          // assertions
          expect(views).toBeDefined();
        });

        describe("master", function() {

          var master;

          it("should be defined", function() {
            // arrange
            /*jshint sub:true*/
            master = views['master'];

            // assertions
            expect(master).toBeDefined();
          });

          it("should map to templateUrl \'app/main/templates/layout.html\'", function() {
            expect(master.templateUrl).toEqual('app/main/templates/layout.html');
          });

        });

        describe("content", function() {

          var content;

          it("should be defined", function() {
            // arrange
            /*jshint sub:true*/
            content = views['content@about'];

            // assertions
            expect(content).toBeDefined();
          });

          it("should map to templateUrl \'app/about/templates/page.html\'", function() {
            expect(content.templateUrl).toEqual('app/about/templates/page.html');
          });

          it("should map to controller \'AboutCtrl\'", function() {
            expect(content.controller).toEqual('AboutCtrl');
          });

          it("should map to controllerAs \'vm\'", function() {
            expect(content.controllerAs).toEqual('vm');
          });

        });

      });

    });

  }); //--- end: States Map

});
