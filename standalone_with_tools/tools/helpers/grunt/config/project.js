module.exports = {

  paths: {
    src: '../src',
    build: './temp',
    dist: '../dist'
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