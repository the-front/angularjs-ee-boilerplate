module.exports = function(grunt) {

var config = require('../../../config')();

grunt.config('project', {

  karma: config.karma,

  paths: config.paths,

  require: {
    name: 'ng.app',
    config: '<%= project.paths.src %>/require.config.js',
    build: '<%= project.paths.build %>/require.build.config.js'
  },

  coverage: {
    port: {
      webserver: (config.frontend.webserver + 1),
      livereload: (config.frontend.livereload + 1) // default: 35729
    }
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
