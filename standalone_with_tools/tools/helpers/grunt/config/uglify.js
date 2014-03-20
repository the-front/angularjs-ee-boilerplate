module.exports = {

  dist: {
    files: {
      '<%= project.paths.dist %>/require.config.js': ['<%= project.paths.dist %>/require.config.js'] ,
     '<%= project.paths.dist %>/shared/fallback/ie.js': ['<%= project.paths.dist %>/shared/fallback/ie.js'] 
    }
  }

};