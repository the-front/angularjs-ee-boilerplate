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
  }

});

};