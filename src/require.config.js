require(['deps.config'], function(){
  var _config = getRequireConfig();
  _config.deps = ['./ng.app'];
  require(_config);
});
