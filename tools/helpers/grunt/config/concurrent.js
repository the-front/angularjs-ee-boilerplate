module.exports = function(grunt) {

grunt.config('concurrent', {

  specs: {
    tasks: [
      'specs:run:coverage', // task defined on /tools/Gruntfile.js
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
