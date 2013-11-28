module.exports = {

  src: '../src',

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