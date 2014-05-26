module.exports = {

  paths: {
    src: '../src',
    build: './temp',
    dist: '../dist',
    editorconfig: '../.editorconfig'
  },

  require: {
    name: 'ng.app',
    config: '<%= project.paths.src %>/require.config.js',
    build: '<%= project.paths.build %>/require.build.config.js'
  },

  frontend: {
    port: {
      connect: 1337,
      livereload: 9999 // default: 35729
    }
  },

  backend: {
    proxies: [
      {
        context: '/rest',
        host: 'localhost',
        port: 9000,

        // https://github.com/drewzboto/grunt-connect-proxy#proxy-configuration
        xforward: false
      }
    ]
  }

};
