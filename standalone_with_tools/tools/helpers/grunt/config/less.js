module.exports = {

  dev: {
    options: {
       // These paths are searched for @imports
      paths: ['<%= app.path %>']
    },
    files: {
      '<%= app.path %>/styles/app.css': '<%= app.path %>/styles/less/app.less'
    }
  },

  prod: {
    options: {
       // These paths are searched for @imports
      paths: ['<%= app.path %>'],
      compress: true
    },
    files: {
      '<%= app.path %>/styles/app.css': '<%= app.path %>/styles/less/app.less'
    }
  }
  
};