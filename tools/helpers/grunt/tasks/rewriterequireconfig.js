// http://gruntjs.com/creating-tasks
// http://gruntjs.com/api/grunt.file

module.exports = function(grunt) {
  'use strict';

  var rewrite = require('../../lib/requirejs/js-ast-js/rewrite-require-config');

  grunt.registerTask('rewriteRequireConfig', 'Rewrite require.config.js to r.js', function() {

    var project = grunt.config.get('project');

    var srcInputFile = project.require.config,
        srcOutputFile = project.require.build;

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
