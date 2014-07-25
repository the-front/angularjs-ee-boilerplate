var _     = require('lodash-node'),
    path  = require('path'),
    Q     = require('q'),
    fs    = require('q-io/fs');

/*
  1 - load templates from directory
  2 - compile and cache templates
  3 - process templates
  4 - output files
*/

module.exports = function( options ) {

  var debugFlag = false;
  function log(msg) {
    if(debugFlag) console.log(msg);
  }

  //---------------------------------------------
  // check options

  /*
  var options = {
    source: '',
    destination: '',
    values: {},

    debug: false,
    updateFileName: function or string
  };
  */

  if( !options ) throw new Error('options not defined');

  if( options.debug ) debugFlag = true;

  if( !options.source )  throw new Error('options.source not defined');
  var source = options.source;

  if( !options.destination )  throw new Error('options.destination not defined');
  var destination = options.destination;

  if( !options.values )  throw new Error('options.values not defined');
  var values = options.values;

  //---------------------------------------------

  var _updateFileName = null;
  if( _.isFunction( options.updateFileName ) ) {

    _updateFileName = options.updateFileName;

  } else if( _.isString( options.updateFileName ) ) {

    _updateFileName = function( ignored ) {
      return options.updateFileName;
    };

  } else {

    _updateFileName = function( filename ) { return filename; };

  }

  //---------------------------------------------

  log('\nrunning generate engine \noptions: \n');
  log( options );
  log('\n------------------------------------\n');

  //---------------------------------------------

  var TemplateProcessError = (function() {

    function TemplateProcessError(message, error) {
      Error.captureStackTrace(this, this.constructor);
      this.name = this.constructor.name;
      this.message = message;

      this.toString = function() {
        var out = this.name + ': \n  ' + this.message;
        if(error) out += '\nTemplate Error :\n  ' + error.stack;
        return out;
      };
    }
    var ClassDef = TemplateProcessError;

    ClassDef.prototype = new Error();
    ClassDef.prototype.constructor = TemplateProcessError;

    return ClassDef;

  })();

  //---------------------------------------------

  function processDirectory() {

    var metadata = {};
    var templateCache = {};

    function filterOnlyFiles(path, stat) {
      // ignore dot files like .DS_Store
      var filename = path.split('/').pop();
      return stat.isFile() && !filename.match(/^\./);
    }

    return fs.listTree(source, filterOnlyFiles) // list files
      .then(function(files) {

        var templateName, output;

        return Q.all(files.sort().map(function(filePath) {

          return fs.read(filePath).then(function(content) { // read template file

            log('read: ' + filePath);

            templateName = filePath.replace(source + '/', '');

            output = {
              path: filePath,
              name: path.basename(filePath),
              templateName: templateName,
              directory: path.dirname( filePath ).replace(source, ''),
              content: content
            };

            metadata[templateName] = output;

            try{
              templateCache[templateName] = _.template(content);
            } catch(err) {
              throw new TemplateProcessError(filePath, err);
            }

            return output;

          });

        }));
      })
      .then(function(files) { // process templates and write files

        log('\n------------------------------------\n');

        return Q.all(files.map(function(file) {

          var fileUrl, content;

          // define file destination
          fileUrl = path.join(
            destination, // output directory
            values.name, // processed templates directory output
            file.directory, // exist some sub directory ?
            _updateFileName( file.name ) // output file name
          );

          log( fileUrl );

          // process template
          content = templateCache[file.templateName](values);

          log( content );
          log('\n------------------------------------\n');

          // create directories tree
          return fs.makeTree(path.dirname(fileUrl)).then(function() {
            log('write file: ' + fileUrl);
            return fs.write(fileUrl, content); // write file to disk
          });

        }));


      });

  }

  //---------------------------------------------

  function processFile() {

    return fs.read(source).then(function(content) { // read template file

      log('read: ' + source);

      var tplCache = null;
      try{
        tplCache = _.template(content);
      } catch(err) {
        throw new TemplateProcessError(source, err);
      }

      return {
        name: path.basename(source),
        templateCache: tplCache
      };

    })
    .then(function(file) {

      log('\n------------------------------------\n');

      var fileUrl, content;

      // define file destination
      fileUrl = path.join(
        destination, // output directory
        _updateFileName( file.name ) // output file name
      );

      log( fileUrl );

      // process template
      content = file.templateCache(values);

      log( content );
      log('\n------------------------------------\n');

      // create directories tree
      return fs.makeTree(path.dirname(fileUrl)).then(function() {
        log('write file: ' + fileUrl);
        return fs.write(fileUrl, content); // write file to disk
      });

    });

  }

  //---------------------------------------------
  // templates processment flow

  return fs.exists( source ).then(function( flag ) {

    if( flag ) {

      // check if options.source is file or directory
      return fs.stat( source ).then(function( stat ) {

        if( stat.isDirectory() ) {

          return processDirectory(); // directory templates processment flow

        } else if( stat.isFile() ) {

          return processFile(); // file template processment flow

        } else {

          throw new Error( 'Invalid : \n  ' + source );

        }

      });

    } else {

      throw new Error( 'Not found : \n  ' + source );

    }

  });


};
