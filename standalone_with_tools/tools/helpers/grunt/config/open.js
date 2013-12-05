module.exports = {

  dev: {
    path: 'http://localhost:<%= connect.dev.options.port %>/'
  },

  dev_proxy: {
    path: 'http://localhost:<%= connect.dev_proxy.options.port %>/'
  }

};