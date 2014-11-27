describe('ui.router: \'home\'', function() {

  var state;

  // excuted before each "it" is run
  beforeEach(function() {

    // load the module
    module('home');

    // inject dependencies
    inject(function($state) {
      state = $state;
    });

  });

  describe("States Map", function() {

    it("$state should be defined", function() {
      expect(state).toBeDefined();
    });

    describe("home state", function() {

      var config;

      it("should be defined", function() {
        // arrange
        config = state.get('home');

        // assertions
        expect(config).toBeDefined();
      });

      it("should map url to \'/home\'", function() {
        expect(config.url).toEqual('/home');
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
            content = views['content@home'];

            // assertions
            expect(content).toBeDefined();
          });

          it("should map to templateUrl \'app/home/template.html\'", function() {
            expect(content.templateUrl).toEqual('app/home/template.html');
          });

          it("should map to controller \'HomeCtrl\'", function() {
            expect(content.controller).toEqual('HomeCtrl');
          });

          it("should map to controllerAs \'vm\'", function() {
            expect(content.controllerAs).toEqual('vm');
          });

        });

      });

    });

  }); //--- end: States Map

});
