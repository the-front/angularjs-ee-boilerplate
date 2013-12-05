angular.module('ngMockBackend').factory(

  // factory name
  'BookmarksCollection', 

  // factory dependencies injection
  ['DataStore', 'Helpers',

// factory definition
function(DataStore, helpers) {

  console.log('BookmarksCollection');

  var BookmarksCollection = (function() {

    //--- private att

    var seq = 0;
    var bookmarks = DataStore.addCollection('bookmarks', 'Bookmark', ['id', 'name']);

    //--- @begin: private functions

    function searchValue(find) {
      if(!find) return [];

      var r = [], obj,
          regexp = new RegExp(find, 'i'),
          data = bookmarks.find(),
          len = data.length;

      for (var i = 0; i < len; i++) {
        obj = data[i];

        if(obj.name.match(regexp) || obj.description.match(regexp))
          r.push(obj);
      }

      return r;
    }

    //--- @end: private functions


    // class constructor
    var BookmarksCollection = function() {};
    var ClassDef = BookmarksCollection;
    //---

    //--- @begin: public functions

    ClassDef.prototype.getById = function(id) {
      var r = bookmarks.find({'id': id});
      if(r.length > 0) return r[0]; 
      return null;
    };

    ClassDef.prototype.insert = function(bookmark) {
      if(helpers.isObject(bookmarks)) {
        bookmark.id = seq++;
        return bookmarks.insert(bookmark);
      }
      return null;
    };

    ClassDef.prototype.update = function(bookmark) {
      if(helpers.isObject(bookmarks)) 
        bookmarks.update(bookmark);
    };

    ClassDef.prototype.remove = function(bookmark) {
      if(helpers.isObject(bookmarks)) 
        bookmarks.remove(bookmark);
    };

    ClassDef.prototype.list = function(options) {
      options = options || {page: 1, size: 10};
      return helpers.paginate(bookmarks.find(), options);
    };

    ClassDef.prototype.search = function(find, options) {
      options = options || {page: 1, size: 10};
      return helpers.paginate(searchValue(find), options);
    };

    //--- @end: public functions

    //--- @begin: init collection
    (function() {

      function createObject(_id, _name, _description, _url) {
        return {
          id: _id,
          name: _name,
          description: _description,
          url: _url
        };
      }

      bookmarks.insert(createObject(seq++, 'Twitter - Erko Bridee', '@ErkoBridee', 'https://twitter.com/erkobridee'));
      bookmarks.insert(createObject(seq++, 'GitHub - Erko Bridee', 'github/erkobridee', 'https://github.com/erkobridee'));
      bookmarks.insert(createObject(seq++, 'Delicious - Erko Bridee', 'delicious/erko.bridee', 'http://www.delicious.com/erko.bridee'));
      bookmarks.insert(createObject(seq++, 'Site - Erko Bridee', 'Site : Erko Bridee', 'http://about.erkobridee.com/'));
    
      function fakeUrl() {
        return 'http://google.com/#q=' + seq + '%2B' + seq;
      }

      for (var i = 59; i >= 0; i--) {
        bookmarks.insert(createObject(seq++, 'fake bookmark ' + (seq+1), 'some description to fake bookmark ', fakeUrl()));      
      }

    })();
    //--- @end: init collection

    // return class definition
    return ClassDef;
  })();

  //---
  
  return new BookmarksCollection();

}]);