module.exports = function(grunt) {

grunt.config('protractor', {

  basic: {
    options: {
      configFile: 'config.protractor.js',
      args: {
        baseUrl: 'http://localhost:<%= project.frontend.port.webserver %>'
      }
    }
  }

});

grunt.loadNpmTasks('grunt-protractor-runner');

};
