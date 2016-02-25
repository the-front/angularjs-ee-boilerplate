var getIpAddress = require('../../lib/localip');

//---

module.exports = function(grunt) {

grunt.config('protractor', {

  e2e: {
    options: {
      configFile: 'config.protractor.js',
      args: {
        // https://github.com/angular/protractor/issues/66#issuecomment-186333950
        baseUrl: 'http://' + getIpAddress() + ':<%= project.frontend.port.webserver %>?protractor-test'
      }
    }
  }

});

grunt.loadNpmTasks('grunt-protractor-runner');

};
