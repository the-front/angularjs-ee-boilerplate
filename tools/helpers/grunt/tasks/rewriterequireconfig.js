// http://gruntjs.com/creating-tasks
// http://gruntjs.com/api/grunt.file

module.exports = function(grunt) {
  'use strict';

  var rewrite = require('../../lib/js-ast-js/rewrite-require-config');

  grunt.registerMultiTask('rewriterequireconfig', 'Rewrite require.config.js to r.js', function() {

    var srcInputFile = this.data.input,
        srcOutputFile = this.data.output;

    if( grunt.file.isFile(srcInputFile) ) {

      var inputSrc = grunt.file.read(srcInputFile),
          outputSrc = rewrite(inputSrc);

      grunt.file.write(srcOutputFile, outputSrc);
      grunt.log.writeln('...done');

    } else {

      grunt.fail.fatal('File not found ' + srcInputFile);

    }

  });

};
