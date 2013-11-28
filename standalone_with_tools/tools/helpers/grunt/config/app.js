module.exports = {

  src: '../src',

  /*    
    Using grunt-connect-proxy | frontend technology talk
    http://www.fettblog.eu/blog/2013/09/20/using-grunt-connect-proxy/
  */
  dev_server: {
    proxies: [
      {
        context: '/rest',
        host: 'localhost',
        port: 3000
      }
    ]
  }
  
};