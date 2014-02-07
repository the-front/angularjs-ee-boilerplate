module.exports = {

  src: '../src',

  dev_server: {
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