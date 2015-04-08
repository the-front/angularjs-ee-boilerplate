module.exports = function( options, done ) {

  var questions = require('./questions'),
      engine = require('./engine');

  questions( options )
  .then(function( optionsToEngine ) {

    // TODO: define and return some string message on engine when finished?
    return engine( optionsToEngine );

  })
  .then(function() {
    return done();
  })
  .catch(function(e) {
    return done(e);
  });

};
