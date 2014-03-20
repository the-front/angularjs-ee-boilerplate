module.exports = {

  paths: {
    src: '../src',
    build: './temp',
    dist: '../dist',
  },

  require: {
    name: 'ng.app',
    config: '<%= project.paths.src %>/require.config.js',
    build: '<%= project.paths.build %>/require.build.config.js'
  },

  frontend: {
    port: {
      connect: 1337,
      livereload: 35729
    }
  },

  backend: {
    proxies: [
      {
        context: '/rest',
        host: 'localhost',
        port: 3000,

        // https://github.com/drewzboto/grunt-connect-proxy#proxy-configuration
        xforward: false
      }
    ]
  }
  
};