// http://jshint.com/docs/options/
/* jshint newcap:false */
define(function(require) {
  'use strict';

  var module = require('shared/mock/module');
  require('lokijs');

  var Lokijs = loki;

  module.factory('DataStore', DataStoreFactory);

  //---

  DataStoreFactory.$inject = ['Helpers', '$log'];

  function DataStoreFactory(helpers, console) {

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
    DataStore.db = new Lokijs( 'mock.db' );

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
        hasOwnId: false, // save and use this 'id 'as '_id' inside collection?
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
      if( !options ) throw new Error( 'options not defined' );

      if( !options.name ) throw new Error( 'options.name not defined' );
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
      objectPrivate[objectName].checkOwnId = true;
      objectPrivate[objectName].hasOwnId = false;
      objectPrivate[objectName].collection = DataStore.addCollection(
        objectName,
        objType,
        indicesArray
      );


      if( options.hasOwnId ) {
          objectPrivate[objectName].checkOwnId = false;
          objectPrivate[objectName].hasOwnId = true;
          objectPrivate[objectName].collection.ensureIndex('_id');
      }


      // if objects has own id, update objects id
      objectPrivate[objectName].updateObjects = function(objectsArray) {
        if( this.hasOwnId ) {
          for( var i=0, len=objectsArray.length; i < len; i++ ) {
            var obj = JSON.parse( JSON.stringify( objectsArray[i] ) );
            obj.id = obj._id;
            delete obj._id;
            objectsArray[i] = obj;
          }
        }
        return objectsArray;
      };


      // @begin: default fn functions
      objectPrivate[objectName].searchValue = function(data, find) {
        if(!find) return [];

        var r = [], obj,
            regexp = new RegExp( find, 'i' ),
            len = data.length;

        if( len > 0 && data[0].name ) {
          for (var i = 0; i < len; i++) {
            obj = data[i];

            if( obj.name.match( regexp ) )
              r.push( obj );
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
      var ClassDef = helpers.extendsFn( Collection, objectPrivate[objectName].collection );

        // @begin: public functions

      ClassDef.prototype._ifHasOwnId = function( doc ) {
        if( objectPrivate[this.name].checkOwnId ) {

          if(
            !objectPrivate[this.name].hasOwnId &&
            doc.hasOwnProperty('id') &&
            (
              ( helpers.isNumber( doc.id ) && doc.id > 2 ) ||
              !helpers.isNumber( doc.id )
            )
          ) {
            this.ensureIndex('_id');
            objectPrivate[this.name].hasOwnId = true;
          }

          objectPrivate[this.name].checkOwnId = false;
        }
      };

      ClassDef.prototype.__insert = objectPrivate[objectName].collection.insert;
      ClassDef.prototype.insert = function( doc ) {
        if( helpers.isObject( doc ) ) {

          this._ifHasOwnId( doc );

          if( objectPrivate[this.name].hasOwnId ) {
            if( helpers.isNumber( doc.id ) && doc.id === 0 ) {
              doc.id = objectPrivate[this.name].seq;
            }
            doc._id = doc.id;
          }

          objectPrivate[this.name].seq++;
          return this.__insert( doc );
        }
        return null;
      };

      ClassDef.prototype._ifHasOwnIdFindAndUpdate = function( doc ) {
        if( objectPrivate[this.name].hasOwnId ) {
          var one = this.find({'_id': doc.id});
          doc._id = doc.id;
          doc.id = one[0].id;
        }
        return doc;
      };

      ClassDef.prototype.__update = objectPrivate[objectName].collection.update;
      ClassDef.prototype.update = function( doc ) {
        if( helpers.isObject( doc ) ) {
          this._ifHasOwnIdFindAndUpdate( doc );
          this.__update( doc );
        }
      };

      ClassDef.prototype.__remove = objectPrivate[objectName].collection.remove;
      ClassDef.prototype.remove = function( doc ) {
        if( helpers.isObject( doc ) ) {
          this._ifHasOwnIdFindAndUpdate( doc );
          this.__remove( doc );
        }
      };


      //---

      ClassDef.prototype.getById = function(id) {
        var key = objectPrivate[this.name].hasOwnId ? '_id' : 'id';
        var query = {};
        query[key] = id;

        var r = objectPrivate[this.name].collection.find( query );
        r = objectPrivate[this.name].updateObjects( r );
        if( r.length > 0 ) return r[0];
        return null;
      };

      //---

      ClassDef.prototype.all = function() {
        return objectPrivate[this.name].updateObjects(
          objectPrivate[this.name].collection.find()
        );
      };

      ClassDef.prototype.list = function(options) {
        options = options || {page: 1, size: 10};
        var r = helpers.paginate(
          objectPrivate[this.name].collection.find(),
          options
        );

        objectPrivate[this.name].updateObjects( r.data );

        return r;
      };

      ClassDef.prototype.search = function(find, options) {
        options = options || {page: 1, size: 10};
        var r = helpers.paginate(
          objectPrivate[this.name].searchValue(
            objectPrivate[this.name].collection.find(),
            find
          ),
          options
        );

        objectPrivate[this.name].updateObjects( r.data );

        return r;
      };

        // @end: public functions

      // @end: Collection "Class" definition


      var instance = new Collection(); console.log( instance );
      objectCache[objectName] = instance;
      objectPrivate[objectName].init( instance );
      return instance;

    };

    //--------------------------------------------------------------------------

    return DataStore;

  }

});
