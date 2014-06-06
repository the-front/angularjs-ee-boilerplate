module.exports = function(grunt) {

grunt.config('less', {

  dev: {
    options: {
      // These paths are searched for @imports
      paths: ['<%= project.paths.src %>']
    },
    files: {
      '<%= project.paths.build %>/styles/app.css': '<%= project.paths.src %>/less/app.less'
    }
  },

  prod: {
    options: {
      // These paths are searched for @imports
      paths: '<%= less.dev.options.paths %>',
      compress: true
    },
    files: {
      '<%= project.paths.dist %>/styles/app.css': '<%= project.paths.src %>/less/app.less'
    }
  }

});

};
