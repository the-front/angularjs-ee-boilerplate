define(function(require) {
  'use strict';

  var module = require('shared/mock/module');

  module.factory('Helpers', HelpersFactory);

  //---

  //HelpersFactory.$inject = [];

  function HelpersFactory() {

    var Helpers = (function() {

      // constructor
      var Helpers = function() {};
      var ClassDef = Helpers;
      //---

      ClassDef.prototype.isNumber = function( value ) {
        return /^[0-9]+$/.test( value );
      };

      //---

      ClassDef.prototype.isObject = function( value ) {
        return ( value === Object( value ) && ( 'object' === typeof value ) );
      };

      ClassDef.prototype.isFunction = function( value ) {
        return !!( value && value.constructor && value.call && value.apply );
      };

      //---

      ClassDef.prototype.extendsFn = function( fn, Extend ) {
        if( this.isFunction( fn ) ) {
          var instance = null;
          if( this.isObject( Extend ) ) {
            instance = Extend;
          } else if( this.isFunction( Extend ) ) {
            instance = new Extend();
          }
          if( instance ) {
            fn.prototype = instance; // extends
            fn.prototype.constructor = fn; // redefine old constructor
          }
        }
        return fn;
      };

      ClassDef.prototype.extendsObj = function( destination, source ) {
        for( var property in source ) destination[property] = source[property];
        return destination;
      };

      //---

      ClassDef.prototype.getIdFromURL = function( url, regexp ) {
        var arr = url.split( regexp ); // ex.: /bookmarks\//
        if( arr.length > 1 ) {
          var value = arr[1];
          if( this.isNumber( value ) ) value = parseInt( value, 10 );
          return value;
        }
        return null;
      };

      ClassDef.prototype.getValueFromURL = function( url, regexp ) {
        var find = null,
            arr = url.split( regexp ); // ex.: /bookmarks\/search\//
        if( arr.length > 1 ) {
          find = arr[1];
          arr = find.split( /\?/ );
          if( arr.length > 1 ) find = arr[0];
        }
        return find;
      };

      ClassDef.prototype.createResultMessage = function( _code, _message ) {
        return {
          code: _code,
          message: _message
        };
      };

      ClassDef.prototype.notFound = function( id ) {
        var msg = 'Not found';
        if( id ) msg += ' - id: ' + id;
        return this.createResultMessage( 404, msg );
      };

      ClassDef.prototype.paginate = function( data, options ) {

        if( !options || 'object' !== typeof options ) {
          options = {
            page: 1,
            size: 10
          };
        } else {
          if( !options.hasOwnProperty( 'size' ) ) options.size = 10;
          else if( options.size < 2 ) options.size = 2;
        }

        if( options.page <= 0 ) options.page = 1;

        //---

        var result = {
          data: [],
          count: 0,
          page: 1,
          pages: 1
        };

        //---

        var page = [];
        var i, count, length, limit, flag;

        count = 0;
        length = data.length;
        i = ( ( options.page-1 ) * options.size );
        limit = options.size;

        if( i < length ) {
          flag = true;
        } else {
          flag = false;
        }

        while( flag ) {

          page.push( data[i] );

          i++; count++;

          if( i < length && count < limit ) {
            flag = true;
          } else {
            flag = false;
          }
        }

        result.count = length;
        result.data = page;
        result.page = options.page;
        result.pages = Math.ceil( length / options.size );

        return result;
      };

      // return Class Definition
      return ClassDef;
    })();

    //---

    return new Helpers();

  }

});
