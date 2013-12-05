angular.module('ngMockBackend').factory(

  // factory name
  'BookmarksCollection', 

  // factory dependencies injection
  ['DataStore', 'Helpers',

// factory definition
function(DataStore, helpers) {

  console.debug('BookmarksCollection');

  var Collection = (function() {

    //--- private att

    var seq = 0;
    var collection = DataStore.addCollection('bookmarks', 'Bookmark', ['id', 'name']);

    //--- @begin: private functions

    function searchValue(find) {
      if(!find) return [];

      var r = [], obj,
          regexp = new RegExp(find, 'i'),
          data = collection.find(),
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
      var r = collection.find({'id': id});
      if(r.length > 0) return r[0]; 
      return null;
    };

    ClassDef.prototype.insert = function(object) {
      if(helpers.isObject(object)) {
        object.id = seq++;
        return collection.insert(object);
      }
      return null;
    };

    ClassDef.prototype.update = function(object) {
      if(helpers.isObject(object)) 
        collection.update(object);
    };

    ClassDef.prototype.remove = function(object) {
      if(helpers.isObject(object)) 
        collection.remove(object);
    };

    ClassDef.prototype.list = function(options) {
      options = options || {page: 1, size: 10};
      return helpers.paginate(collection.find(), options);
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

      collection.insert( createObject(seq++, 'Twitter - Erko Bridee', '@ErkoBridee', 'https://twitter.com/erkobridee') );
      collection.insert( createObject(seq++, 'GitHub - Erko Bridee', 'github/erkobridee', 'https://github.com/erkobridee') );
      collection.insert( createObject(seq++, 'Delicious - Erko Bridee', 'delicious/erko.bridee', 'http://www.delicious.com/erko.bridee') );
      collection.insert( createObject(seq++, 'Site - Erko Bridee', 'Site : Erko Bridee', 'http://about.erkobridee.com/') );
    
      function fakeUrl() {
        return 'http://google.com/#q=' + seq + '%2B' + seq;
      }

      for (var i = 59; i >= 0; i--) {
        collection.insert( createObject(seq++, 'fake bookmark ' + (seq+1), 'some description to fake bookmark ', fakeUrl()) );
      }

    })();
    //--- @end: init collection

    // return class definition
    return ClassDef;
  })();

  //---
  
  return new Collection();

}]);