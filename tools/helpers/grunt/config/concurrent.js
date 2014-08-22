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

  dev: {
    tasks: [
      'server:dev', // task defined on /tools/Gruntfile.js
      'watch:project'
    ],
    options: {
      logConcurrentOutput: true
    }
  },

  devProxy: {
    tasks: [
      'server:dev:proxy', // task defined on /tools/Gruntfile.js
      'watch:project'
    ],
    options: {
      logConcurrentOutput: true
    }
  }

});

};
