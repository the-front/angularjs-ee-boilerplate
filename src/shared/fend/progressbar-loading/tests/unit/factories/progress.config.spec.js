describe("Testing fend.progressbar.loading Progress Config Factory", function() {

  /*
    inject mocks into service or factory by using $provider
    https://stackoverflow.com/questions/14773269/injecting-a-mock-into-an-angularjs-service/18756347#18756347

    Supplying Mocks for Services via $provide | Tech Pro
    http://tech.pro/tutorial/1517/supplying-mocks-for-services-via-provide
  */

  var mockNgProgress = (function() {
    var value = 0;
    var _color = '#FFFFFF';
    var _heigh = '2px';

    return {
      color: function(new_color) {
        if(new_color !== undefined) {
          _color = new_color;
        }
        return _color;
      },

      height: function(new_height) {
        if(new_height) {
          _height = new_height;
        }
        return _height;
      },

      start: function() { return 'started'; },
      set: function(value) { return 'value: ' + value; },
      complete: function() { return 'completed'; },
      stop: function() { return 'stoped'; }
    };
  })();

  //----------------------------------------------------------------------------

  var rootScope, config;

  // excuted before each "it" is run
  beforeEach(function() {

    // load the module
    module('fend.progressbar.loading', function ($provide) {
        $provide.value('ngProgress', mockNgProgress);
    });

    // inject dependencies
    inject(function($rootScope, ProgressConfig) {

      rootScope = $rootScope;

      config = ProgressConfig;

    });

  });


  it("should be registered", function() {

    // assertions
    expect(config).toBeDefined();

  });

  it("should set color #00FF00", function() {

    // arrange
    var color = '#00FF00';

    // act
    config.color(color);

    // assertions
    expect(mockNgProgress.color()).toEqual(color);

  });

  it("should set height 5px", function() {

    // arrange
    var height = '5px';

    // act
    config.height(height);

    // assertions
    expect(mockNgProgress.height()).toEqual(height);

  });

  describe("events listeners", function() {

    beforeEach(function() {
      config.eventListeners();
    });

    it("should handle start", function() {

      // arrange
      spyOn(mockNgProgress, 'start');

      // act
      rootScope.$emit('loadingbar:start:event');
      rootScope.$digest();

      // assertions
      expect(mockNgProgress.start).toHaveBeenCalled();

    });

    it("should handle progress", function() {

      // arrange
      var value = 42;
      spyOn(mockNgProgress, 'set');

      // act
      rootScope.$emit('loadingbar:progress:event', value);
      rootScope.$digest();

      // assertions
      expect(mockNgProgress.set).toHaveBeenCalledWith(value);

    });

    it("should handle complete", function() {

      // arrange
      spyOn(mockNgProgress, 'complete');
      spyOn(mockNgProgress, 'stop');

      // act
      rootScope.$emit('loadingbar:complete:event');
      rootScope.$digest();

      // assertions
      expect(mockNgProgress.complete).toHaveBeenCalled();
      expect(mockNgProgress.stop).toHaveBeenCalled();

    });

  });

});
