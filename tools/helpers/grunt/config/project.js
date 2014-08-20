module.exports = function(grunt) {

var config = require('../../../config')();

grunt.config('project', {

  paths: config.paths,

  require: {
    name: 'ng.app',
    config: '<%= project.paths.src %>/require.config.js',
    build: '<%= project.paths.build %>/require.build.config.js'
  },

  frontend: {
    port: {
      webserver: config.frontend.webserver,
      livereload: config.frontend.livereload // default: 35729
    }
  },

  backend: {
    context: config.backend.context,

    proxies: [
      {
        context: '/<%= project.backend.context %>',
        host: config.backend.host,
        port: config.backend.port,

        // https://github.com/drewzboto/grunt-connect-proxy#proxy-configuration
        xforward: false
      }
    ]
  }

});

};
