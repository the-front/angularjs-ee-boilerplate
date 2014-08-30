module.exports = function(grunt) {

grunt.registerTask('reports::conect:open:watch', [
  'connect:reports',
  'open:karma_report_coverage',
  'open:karma_report_jasmine',
  'watch:reports'
]);

grunt.config('concurrent', {

  specs: {
    tasks: [
      'reports::conect:open:watch',
      'karma:unit'
    ],
    options: {
      logConcurrentOutput: true
    }
  },

  livereload: {
    tasks: [
      'server:livereload', // task defined on /tools/Gruntfile.js
      'watch:project'
    ],
    options: {
      logConcurrentOutput: true
    }
  },

  livereloadProxy: {
    tasks: [
      'server:livereload:proxy', // task defined on /tools/Gruntfile.js
      'watch:project'
    ],
    options: {
      logConcurrentOutput: true
    }
  }

});

};
