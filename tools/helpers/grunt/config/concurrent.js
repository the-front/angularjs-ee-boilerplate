module.exports = function(grunt) {

grunt.config('concurrent', {

  specs: {
    // tasks defined on /tools/Gruntfile.js
    tasks: ['specs:run:coverage', 'specs:run:unit'],
    options: {
      logConcurrentOutput: true
    }
  }

});

};
