module.exports = function(grunt) {

grunt.config('html2js', {

  options: {
    module: 'templatesCache',
    fileHeaderString: 'define([\'angular\'], function(angular) { \n',
    fileFooterString: '\n});',

    rename: function (moduleName) {
      return moduleName.replace('../../src/', '');
    }
  },

  dev: {
    src: [
      '<%= project.paths.src %>/app/**/*.html',
      '<%= project.paths.src %>/shared/**/*.html'
    ],
    dest: '<%= project.paths.build %>/app/main/templates/cache.js'
  },

  prod: {
    options: {
      htmlmin: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      }
    },
    src: '<%= html2js.dev.src %>',
    dest: '<%= html2js.dev.dest %>'
  }

});

grunt.loadNpmTasks('grunt-html2js');

};
