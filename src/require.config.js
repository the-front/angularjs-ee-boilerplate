require(['deps.config'], function(){
  var _config = getConfig();
  _config.deps = ['./ng.app'];
  require(_config);
});
