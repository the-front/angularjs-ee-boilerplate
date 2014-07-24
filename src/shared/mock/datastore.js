// http://jshint.com/docs/options/
/* jshint newcap:false */
define(
// require.js dependency injection
[
  'shared/mock/module',
  'lokijs'
],

// require.js module scope
function(module) {
  'use strict';

  module.factory(

    // factory name
    'DataStore',

    // factory dependencies injection
    ['Helpers', '$log',

  // factory definition
  function(helpers, console) {

    //--------------------------------------------------------------------------

    var objectPrivate = {};

    var objectCache = {};

    //--------------------------------------------------------------------------

    var DataStore = {};

    //--------------------------------------------------------------------------

    /*
      http://lokijs.org/
      https://github.com/techfort/LokiJS/blob/master/src/lokijs.js
    */
    DataStore.db = new loki( 'mock.db' );

    DataStore.addCollection = function() {
      return DataStore.db.addCollection.apply(
        DataStore.db, // lokijs database instance
        arguments // DataStore.addCollection function arguments
      );
    };

    //--------------------------------------------------------------------------

    // for implements on some future:
    // support to offline storage : [ localStorage or IndexDB ]

    // https://github.com/techfort/LokiJS/blob/master/src/lokijs.js#L137

    //--------------------------------------------------------------------------

    DataStore.get = function( collectionObjectName ) {
      var instance = objectCache[collectionObjectName];
      if( !instance ) {
        throw new Error( 'Collection: ' + collectionObjectName + ' not defined' );
      }
      return instance;
    };

    /*
      options = {
        name: '',
        objType: '',
        indicesArray: ['id'],
        fn: {
          searchValue: function(data, find) {},
          init: function( collection ) {}
        }
      }
    */
    DataStore.create = function(options) {
      var objectName = '',
          objType = '',
          indicesArray = null;


      // @begin: check options
      if( !options ) throw new Error('options not defined');

      if( !options.name ) throw new Error('options.name not defined');
      objectName = options.name;

      if( options.objType ) objType = options.objType;

      if( options.indicesArray ) indicesArray = options.indicesArray;
      // @end: check options


      if( objectCache[objectName] ) {
        throw new Error( 'Collection: ' + objectName + ' already defined' );
      }


      // @begin: define private attributes
      objectPrivate[objectName] = {};
      objectPrivate[objectName].seq = 0;
      objectPrivate[objectName].collection = DataStore.addCollection(
        objectName,
        objType,
        indicesArray
      );


      // @begin: default fn functions
      objectPrivate[objectName].searchValue = function(data, find) {
        if(!find) return [];

        var r = [], obj,
            regexp = new RegExp(find, 'i'),
            len = data.length;

        if( len > 0 && data[0].name ) {
          for (var i = 0; i < len; i++) {
            obj = data[i];

            if(obj.name.match(regexp))
              r.push(obj);
          }
        }

        return r;
      };

      objectPrivate[objectName].init = function() {};
      // @end: default fn functions


      if( options.fn ) {
        var fn = options.fn;
        if( fn.searchValue ) {
          objectPrivate[objectName].searchValue = fn.searchValue;
        }
        if( fn.init ) {
          objectPrivate[objectName].init = fn.init;
        }
      }
      // @end: define private attributes


      // @begin: Collection "Class" definition
      function Collection() {
        //console.log( 'Creating ' + objectName + ' Collection "Class"' );
        this.name = objectName;
      }

        // @begin: public functions

      Collection.prototype.getById = function(id) {
        var r = objectPrivate[this.name].collection.find({'id': id});
        if(r.length > 0) return r[0];
        return null;
      };

      Collection.prototype.insert = function(object) {
        if(helpers.isObject(object)) {
          object.id = objectPrivate[this.name].seq++;
          return objectPrivate[this.name].collection.insert(object);
        }
        return null;
      };

      Collection.prototype.update = function(object) {
        if(helpers.isObject(object))
          objectPrivate[this.name].collection.update(object);
      };

      Collection.prototype.remove = function(object) {
        if(helpers.isObject(object))
          objectPrivate[this.name].collection.remove(object);
      };

      Collection.prototype.list = function(options) {
        options = options || {page: 1, size: 10};
        return helpers.paginate(
          objectPrivate[this.name].collection.find(),
          options
        );
      };

      Collection.prototype.search = function(find, options) {
        options = options || {page: 1, size: 10};
        return helpers.paginate(
          objectPrivate[this.name].searchValue(
            objectPrivate[this.name].collection.find(),
            find
          ),
          options
        );
      };

        // @end: public functions

      // @end: Collection "Class" definition


      var instance = new Collection();
      objectCache[objectName] = instance;
      objectPrivate[objectName].init( instance );
      return instance;

    };

    //--------------------------------------------------------------------------

    return DataStore;

  }]);

});
