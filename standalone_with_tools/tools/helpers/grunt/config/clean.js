module.exports = {

  build: ['<%= project.paths.build %>/'],

  dist: {
    options: { force: true },
    src: ['<%= project.paths.dist %>/']
  }

};
