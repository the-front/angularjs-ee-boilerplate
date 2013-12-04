angular.module('ngMockBackend').factory(

  // factory name
  'DataStore', 

  // factory dependencies injection
  [

// Factory definition
function() {

  // http://lokijs.org/
  return new loki('mock.db');

}]);