describe("Testing fend.pagination Pagination Factory", function() {

  var factory;

  // excuted before each "it" is run
  beforeEach(function() {

    // load the module
    module('fend.pagination');

    // inject dependencies
    inject(function(PaginationFactory) {

      factory = PaginationFactory;

    });

  });


  it("should be registered", function() {

    // assertions
    expect(factory).toBeDefined();

  });

  describe("instance", function() {

    var pagination;

    it("should get instance", function() {

      // act
      pagination = factory.get('paginationInstance');

      // assertions
      expect(factory.get('paginationInstance')).toBeDefined();
      expect(pagination.classInfo).toEqual('Pagination for: paginationInstance');

    });

    it("should reset page size to 20", function() {

      // act
      pagination.resetPageSize(20);

      // assertions
      expect(pagination.getPageSize()).toEqual(20);

    });

    it("should set next page to 2", function() {

      // act
      pagination.setNextPage(2);

      // assertions
      expect(pagination.getNextPage()).toEqual(2);

    });

    it("should update metainf", function() {

      // arrange
      pagination.resetPageSize(10);

      var count = 100,
          lastPageSize = 10,
          lastPage = 2,
          totalPages = Math.ceil(count/pagination.getPageSize());

      // act
      pagination.updateMetainf(count, lastPageSize, lastPage, totalPages);

      // assertions
      expect(pagination.metainf.count).toEqual(count);
      expect(pagination.metainf.lastPageSize).toEqual(lastPageSize);
      expect(pagination.metainf.lastPage).toEqual(lastPage);
      expect(pagination.metainf.totalPages).toEqual(totalPages);

    });

    describe("addCheck", function() {

      it("should go last page", function() {

        // arrange
        var count = 95,
            totalPages = Math.ceil(count/pagination.getPageSize());
        pagination.resetPageSize(10);
        pagination.metainf.count = count;
        pagination.metainf.totalPages = totalPages;

        // act
        pagination.addCheck();

        // assertions
        expect(pagination.getNextPage()).toEqual(totalPages);

      });

      it("should go to last page + 1", function() {

        // arrange
        var count = 100,
            totalPages = Math.ceil(count/pagination.getPageSize());
        pagination.resetPageSize(10);
        pagination.metainf.count = count;
        pagination.metainf.totalPages = totalPages;

        // act
        pagination.addCheck();

        // assertions
        expect(pagination.getNextPage()).toEqual(totalPages+1);

      });

    });

    describe("removeCheck", function() {

      describe("stay in same page", function() {

        it("should nextPage to be equals to 0", function() {

          // arrange
          pagination.metainf.lastPageSize = 1;
          pagination.metainf.totalPages = 1;

          // act
          pagination.removeCheck();

          // assertions
          expect(pagination.getNextPage()).toEqual(0);

        });

        it("should nextPage to be equals to 3", function() {

          // arrange
          pagination.metainf.lastPageSize = 5;
          pagination.setNextPage(3);

          // act
          pagination.removeCheck();

          // assertions
          expect(pagination.getNextPage()).toEqual(3);

        });

      });


      it("should go to previous page", function() {

        // arrange
        pagination.metainf.lastPageSize = 1;
        pagination.metainf.totalPages = 2;

        // act
        pagination.removeCheck();

        // assertions
        expect(pagination.getNextPage()).toEqual(1);

      });

    });

  });

});
