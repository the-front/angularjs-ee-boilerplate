var path      = require('path'),
    _         = require('lodash-node'),
    _s        = require( 'underscore.string' ),
    Q         = require('q'),
    fs        = require('q-io/fs'),
    moment    = require('moment'),
    inquirer  = require('inquirer');

//-----------------------------------------------------------------------------

/*
  single file and other templates samples check
  https://github.com/erkobridee/lab-nodejs/tree/master/javascript/runner/task/grunt/templates/lodash-template
*/

//-----------------------------------------------------------------------------

var outputAnswers = {
  source: '', // template
  destination: '', // output
  restContext: null,
  debug: false,
  values: null,
  updateFileName: null
};

//---

var helpersSet = {
  capitalize: function(value) {
    return _s.capitalize(value);
  },

  stringRegExpEscape: function(string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  }
};


// To assign on outputAnswers.values.helpers
var commonHelpers = {
  capitalize: helpersSet.capitalize
};

//---

var templates = {

  'gruntjs_config': {
    type: 'file',
    source: '/gruntjs/config.js',
    destination: {
      // overwrite output destination
      dirname: 'helpers/grunt/config'
    }
  },

  'angularjs_page': {
    type: 'directory',
    source: '/angularjs/page',
    destination: 'app' // concat with output destination
  },

  'angularjs_crud': {
    type: 'directory',
    source: '/angularjs/crud',
    destination: 'app', // concat with output destination
    helpers: {
      stringRegExpEscape: helpersSet.stringRegExpEscape
    }
  },

  'angularjs_resource': {
    type: 'directory',
    source: '/angularjs/resource',
    destination: 'app', // concat with output destination
    helpers: {
      stringRegExpEscape: helpersSet.stringRegExpEscape
    }
  }

};

//---

/*
  macro flow view:

  1 - which template
  2 - values for selected template
  3 - change default output

*/

var questions = {

  'templates': {

    'available': {
      type: 'list',
      name: 'selected',
      message: 'Select Template',
      choices: [
        {
          name: 'Angular.js',
          value: { type: 'question', key: 'angularjs' }
        },
        {
          name: 'Grunt.js Config Task File',
          value: { type: 'template', key: 'gruntjs_config'}
        }
      ]
    },

    'angularjs': {
      type: 'list',
      name: 'selected',
      message: 'Select Angular.js Template',
      choices: [
        {
          name: 'Use Case (CRUD)',
          value: { type: 'template', key: 'angularjs_crud' }
        },
        {
          name: 'Resource',
          value: { type: 'template', key: 'angularjs_resource' }
        },
        {
          name: 'Page',
          value: { type: 'template', key: 'angularjs_page' }
        }
      ]
    }

  }

};

//-----------------------------------------------------------------------------
// @begin: file system utils

function checkIfExists( checkPath ) {
  return fs.exists( checkPath );
}

function renameOld( pathToRename ) {
  return fs.stat( pathToRename )
    .then(function( stat ) {

      var target = '';
      var infoString = '_old_';
      var now = moment().format('YYYYMMDDHHmmss');

      if( stat.isDirectory() ) {

        target = pathToRename + infoString + now;

      } else if( stat.isFile() ) {

        var dirname = path.dirname( pathToRename ),
            extname = path.extname( pathToRename ),
            filename = path.basename( pathToRename, extname );

        target = path.join( dirname, ( filename + infoString + now + extname ) );

      } else {

        throw new Error( 'Invalid : \n  ' + pathToRename );

      }

      return fs.rename( pathToRename, target )
        .then(function() {
          return 'renamed from: [' + pathToRename + '] to [' + target + ']';
        });

    });
}

// @end: file system utils
//-----------------------------------------------------------------------------

function checkTemplateHelpers() {

  var selectedTemplate = outputAnswers.template,
      updateFileName = null,
      helpers = {};

  _.assign( helpers, commonHelpers );

  if( selectedTemplate.helpers ) {

    _.assign( helpers, selectedTemplate.helpers );

    updateFileName = selectedTemplate.helpers.updateFileName;
    if(
      updateFileName &&
      _.isFunction( updateFileName )
    ) {

      outputAnswers.updateFileName = updateFileName;

    }

  }

  _.assign( outputAnswers.values, { helpers: helpers } );

  delete outputAnswers.template;

  selectedTemplate = null;
  updateFileName = null;
  helpers = null;

} // end: checkTemplateHelpers()

//-----------------------------------------------------------------------------

function hasWhiteSpace(s) {
  return /\s/g.test(s);
}

function inputQuestion(name, message, defaultAnswer, fnValidate) {
  return {
    type: 'input',
    name: name,
    message: message,
    validate: fnValidate,
    default: defaultAnswer,
  };
}

//-----------------------------------------------------------------------------

function ask(questions, cb) {
  var promise = null;

  if( !cb ) {
    var deferred = Q.defer();
    cb = deferred.resolve;
    promise = deferred.promise;
  }

  inquirer.prompt(questions, cb);

  return promise;
}

//-----------------------------------------------------------------------------
// @begin: askFor

var askFor = {

  template: function(key) {
    return ask(questions.templates[key])
      .then(function(answer) {
        if(answer.selected.type === 'question') {
          return askFor.template(answer.selected.key);
        }
        return answer;
      });
  },

  yes_no: function(msg, defaultAnswer) {
    if( _.isUndefined( defaultAnswer ) ) defaultAnswer = true;
    return ask({
      type: 'confirm',
      name: 'value',
      message: msg,
      default: defaultAnswer
    });
  },

  not_empty_answer: function(forValue, checkWhitespaces) {
    if( _.isUndefined( checkWhitespaces ) ) checkWhitespaces = true;
    return ask(inputQuestion(
      'input',
      'Define ' + forValue + ':',
      null,
      function( value ) {
        var msg = 'Please enter a ' + forValue;
        var valid =  !_.isEmpty(value) && !_.isNumber(value);
        if(valid && checkWhitespaces) {
          valid = (hasWhiteSpace(value) ? msg + ' without whitespaces' : true);
        }
        return valid || msg;
      }));
  },

  name: function() {
    return askFor.not_empty_answer('name');
  },


  values: {

    gruntjs_config: function() {
      return askFor.name()
        .then(function(answer) {
          return { 'name': answer.input };
        });
    },


    angularjs_page: function() {
      var output = {};

      return askFor.name()
        .then(function(answer) {
          output.name = answer.input;

          return ask(inputQuestion('input', 'Define route:', '/' + output.name));
        })
        .then(function(answer) {
          var route = answer.input;
          if( route.indexOf('/') === 0 ) {
            route = route.slice(1, route.length);
          }
          output.route = route;
        })
        .then(function() {
          return output;
        });
    },

    angularjs_crud: function() {
      return askFor.values.angularjs_page()
        .then(function(output) {

          return ask(inputQuestion(
            'input',
            'Define resource url:',
            outputAnswers.restContext + '/' + output.name
          ))
          .then(function(answer) {
            output.endpoint = answer.input;
          })
          .then(function() {
            return output;
          });

        });
    },

    angularjs_resource: function() {
      return askFor.name()
        .then(function(answer) {
          var output = {};

          output.name = answer.input;

          return output;
        })
        .then(function(output) {

          return ask(inputQuestion(
            'input',
            'Define resource url:',
            outputAnswers.restContext + '/' + output.name
          ))
          .then(function(answer) {
            output.endpoint = answer.input;
          })
          .then(function() {
            return output;
          });

        });
    }


  }, // @end: values


  output: {

    check: function() {
      return askFor.output[outputAnswers.template.type]();
    },

    file: function() {

      //-----------------------------------
      // @begin: define output attributes

      var outputDestination = outputAnswers.destination.dirname;
      var selectedTemplate = outputAnswers.template;
      var extname = null;
      var basename = null;

      var output = {
        dirname: outputDestination,
        file: null
      };

      if( selectedTemplate.destination ) {

        if( _.isString( selectedTemplate.destination ) ) {

          output.dirname = path.join( output.dirname, selectedTemplate.destination );

        } else {

          if( selectedTemplate.destination.dirname ) {
            output.dirname = selectedTemplate.destination.dirname;
          }

          if( selectedTemplate.destination.filename ) {
            extname = path.extname( selectedTemplate.destination.filename );
            output.file = {
              name: path.basename( selectedTemplate.destination.filename, extname ),
              ext: extname
            };
          }

        }

      }

      if( !output.file ) {
        if( outputAnswers.values.name ) {
          output.file = {
            name: outputAnswers.values.name,
            ext: path.extname( selectedTemplate.source )
          };
        } else {
          extname = path.extname( selectedTemplate.source );
          basename = path.basename( selectedTemplate.source );
          output.file = {
            name: path.basename( basename, extname ),
            ext: extname
          };
        }
      }

      //@end: define output attributes
      //-----------------------------------

      function getOutputPath() {
        return path.join(output.dirname, output.file.name + output.file.ext);
      }

      //-----------------------------------

      function updateOutput() {

        var whatToUpdate = {
          type: 'list',
          name: 'selected',
          message: 'Update',
          choices: [
            {
              name: 'Directory       : ' + output.dirname,
              value: 'dirname'
            },
            {
              name: 'File name       : ' + output.file.name,
              value: 'filename'
            },
            {
              name: 'File extension  : ' + output.file.ext,
              value: 'fileext'
            }
          ]
        };

        var update = {
          dirname: function() {
            // TODO: review and define another input validator
            return askFor.not_empty_answer('directory')
              .then(function( answer ) {
                output.dirname = answer.input;
              });
          },

          filename: function() {
            // TODO: review and define another input validator
            return askFor.not_empty_answer('file name')
              .then(function( answer ) {
                output.file.name = answer.input;
              });
          },

          fileext: function() {
            // TODO: review and define another input validator
            return askFor.not_empty_answer('file extension')
              .then(function( answer ) {
                var ext = answer.input;
                if( ext.indexOf('.') !== 0 ) ext = '.' + ext;
                output.file.ext = ext;
              });
          }
        };

        return ask(whatToUpdate)
          .then(function(answer) {
            return update[answer.selected]();
          })
          .then(function() {
            return askForChangeOutput();
          })
        ;
      } // @end: updateOutput()

      //-----------------------------------

      function askForChangeOutput( defaultAnswer ) {
        if( _.isUndefined( defaultAnswer ) ) defaultAnswer = false;

        var outputPath = getOutputPath();

        var questionMsg = 'Change output';
        questionMsg += '\n    directory : ' + output.dirname;
        questionMsg += '\n    file';
        questionMsg += '\n      name    : ' + output.file.name;
        questionMsg += '\n      ext     : ' + output.file.ext;
        questionMsg += '\n    path      : ' + outputPath;
        questionMsg += '\n>>> ';

        return askFor.yes_no(questionMsg, defaultAnswer)
          .then(function( answer ) {

            if( answer.value ) {

              return updateOutput();

            } else {

              return checkIfExists( outputPath )
                .then(function (flag) {

                  if( flag ) {
                    return askFor.yes_no('File already exists, overwrite?', false)
                      .then(function( answer ) {

                          if( answer.value ) { // overwrite file
                            return renameOld( outputPath );
                          } else { // ask to change output
                            return askForChangeOutput( true ); // set default answer to true
                          }

                      });
                  }

                  return 'finished';

                });

            }

          });

      } // @end: askForChangeOutput( defaultAnswer )

      //-----------------------------------

      return askForChangeOutput()
        .then(function() {

          // TODO: review : needed?
          var fileOutput = {
            dirname: output.dirname,
            filename: (output.file.name + output.file.ext)
          };

          // @begin: update outputAnswers
          checkTemplateHelpers();
          outputAnswers.destination = fileOutput.dirname;
          outputAnswers.updateFileName = fileOutput.filename;
          // @end: update outputAnswers

          return fileOutput;
        });

    }, // @end: output.file

    directory: function() {

      //-----------------------------------
      // @begin: define output attributes

      var outputDestination = outputAnswers.destination.dirname;
      var selectedTemplate = outputAnswers.template;

      var output = {

        directory: {
          base: outputDestination,
          sub: '',
          name: ''
        }

      };

      if( selectedTemplate.destination ) {

        if( _.isString( selectedTemplate.destination ) ) {

          output.directory.sub = selectedTemplate.destination;

        } else {

          if( selectedTemplate.destination.dirname ) {
            output.directory.base = selectedTemplate.destination.dirname;
          }

        }

      }

      if( outputAnswers.values && outputAnswers.values.name ) {
        output.directory.name = outputAnswers.values.name;
      }

      //@end: define output attributes
      //-----------------------------------

      function getOutputPath() {
        return path.join( output.directory.base, output.directory.sub, output.directory.name );
      }

      //-----------------------------------

      function updateOutput() {

        var whatToUpdate = {
          type: 'list',
          name: 'selected',
          message: 'Update',
          choices: [
            {
              name: 'Base directory  : ' + output.directory.base,
              value: 'base'
            },
            {
              name: 'Subdirectory    : ' + output.directory.sub,
              value: 'sub'
            }
          ]
        };

        var update = {
          base: function() {
            // TODO: review and define another input validator
            return askFor.not_empty_answer('base directory')
              .then(function( answer ) {
                output.directory.base = answer.input;
              });
          },

          sub: function() {
            // TODO: review and define another input validator
            return askFor.not_empty_answer('subdirectory')
              .then(function( answer ) {
                output.directory.sub = answer.input;
              });
          }
        };

        return ask(whatToUpdate)
          .then(function(answer) {
            return update[answer.selected]();
          })
          .then(function() {
            return askForChangeOutput();
          })
        ;
      } // @end: updateOutput()

      //-----------------------------------

      function askForChangeOutput( defaultAnswer ) {
        if( _.isUndefined( defaultAnswer ) ) defaultAnswer = false;

        var outputPath = getOutputPath();

        var questionMsg = 'Change output';
        questionMsg += '\n    directory';
        questionMsg += '\n      base     : ' + output.directory.base;
        questionMsg += '\n      sub      : ' + output.directory.sub;
        questionMsg += '\n      name     : ' + output.directory.name;
        questionMsg += '\n    path       : ' + outputPath;
        questionMsg += '\n>>> ';

        return askFor.yes_no(questionMsg, defaultAnswer)
          .then(function( answer ) {

            if( answer.value ) {

              return updateOutput();

            } else {

              return checkIfExists( outputPath )
                .then(function (flag) {

                  if( flag ) {
                    return askFor.yes_no('Directory already exists, overwrite?', false)
                      .then(function( answer ) {

                          if( answer.value ) { // overwrite file
                            return renameOld( outputPath );
                          } else { // ask to change output
                            return askForChangeOutput( true ); // set default answer to true
                          }

                      });
                  }

                  return 'finished';

                });

            }

          });

      } // @end: askForChangeOutput( defaultAnswer )

      //-----------------------------------

      return askForChangeOutput()
        .then(function() {

          function buildLocationAttribute() {
            var location = '';

            if( !_.isEmpty( output.directory.sub ) ) {
              location += output.directory.sub + '/';
            }

            location += outputAnswers.values.name;

            return location;
          }

          // @begin: update outputAnswers
          checkTemplateHelpers();
          outputAnswers.values.location = buildLocationAttribute();
          outputAnswers.destination = path.join( output.directory.base, output.directory.sub );
          // @end: update outputAnswers

          // TODO: review : needed?
          return output;
        });

    } // @end: output.directory

  } // @end: output

};

// @end: askFor
//-----------------------------------------------------------------------------

function start(options) {

  //------------------------
  // @begin: check options

  /*
  var options = {
    source: '',
    destination: '',
    restContext: ''
  };
  */

  if( !options ) throw new Error('options not defined');

  if( !options.source )  throw new Error('options.source not defined');
  outputAnswers.source = options.source;

  if( !options.destination )  throw new Error('options.destination not defined');
  outputAnswers.destination = { dirname: options.destination };

  outputAnswers.restContext = 'rest';
  if( options.restContext ) {
    var restContext = options.restContext;
    if( restContext.indexOf('/') === 0 ) {
      restContext = restContext.slice(1, restContext.length);
    }
    outputAnswers.restContext = restContext;
  }

  // @end: check options
  //------------------------

  return askFor.template('available')
    .then(function(answer) {

      //-------------------------------------------
      // @begin: define : source
      var template = templates[answer.selected.key];

      outputAnswers.template = template;

      outputAnswers.source = path.join( outputAnswers.source, template.source );
      // @end: define : source
      //-------------------------------------------

      return askFor.values[answer.selected.key]();

    })
    .then(function(answers) {

      outputAnswers.values = answers;

    })
    .then(function() {

      return askFor.output.check();

    })
    .then(function ( answers ) {

      return askFor.yes_no('Debug generate engine', false);

    })
    .then(function( answer ) {

      outputAnswers.debug = answer.value;
      delete outputAnswers.restContext;

      return outputAnswers;

    });

}

module.exports = start;

//-----------------------------------------------------------------------------
