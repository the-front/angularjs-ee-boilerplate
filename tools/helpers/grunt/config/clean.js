module.exports = {

  build: {
    options: { force: true },
    src: ['<%= project.paths.build %>/']
  },

  dist: {
    options: { force: true },
    src: ['<%= project.paths.dist %>/']
  }

};
