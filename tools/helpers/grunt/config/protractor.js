var getIpAddress = require('../../lib/localip');

//---

module.exports = function(grunt) {

grunt.config('protractor', {

  e2e: {
    options: {
      configFile: 'config.protractor.js',
      args: {
        baseUrl: 'http://' + getIpAddress() + ':<%= project.frontend.port.webserver %>'
      }
    }
  }

});

grunt.loadNpmTasks('grunt-protractor-runner');

};
