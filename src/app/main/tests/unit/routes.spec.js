describe('ui.router: \'main\'', function() {

  var state;

  // excuted before each "it" is run
  beforeEach(function() {

    // load the module
    module('main');

    // inject dependencies
    inject(function($state) {
      state = $state;
    });

  });

  describe("States Map", function() {

    it("$state should be define", function() {
      expect(state).toBeDefined();
    });

    describe("404 state", function() {

      var config;

      it("should be defined", function() {
        // arrange
        config = state.get('404');

        // assertions
        expect(config).toBeDefined();
      });

      it("should map url to \'/404\'", function() {
        expect(config.url).toEqual('/404');
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
            content = views['content@404'];

            // assertions
            expect(content).toBeDefined();
          });

          it("should map to templateUrl \'app/main/templates/404.html\'", function() {
            expect(content.templateUrl).toEqual('app/main/templates/404.html');
          });

        });

      });

    });

  }); //--- end: States Map

});
