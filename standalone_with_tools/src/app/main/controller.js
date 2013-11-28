angular.module('app').controller(

  // controller name
  'MainCtrl', 

  // dependencies injection
  ['ProgressConfig',

// controller definition
function(progressConfig) {

  progressConfig.eventListeners();
  progressConfig.color('#428bca');  

}]);