module.exports = {

  dev: {
    options: {
       // These paths are searched for @imports
      paths: ['<%= app.src %>']
    },
    files: {
      '<%= app.src %>/styles/app.css': '<%= app.src %>/styles/less/app.less'
    }
  },

  prod: {
    options: {
       // These paths are searched for @imports
      paths: ['<%= app.src %>'],
      compress: true
    },
    files: {
      '<%= app.src %>/styles/app.css': '<%= app.src %>/styles/less/app.less'
    }
  }
  
};