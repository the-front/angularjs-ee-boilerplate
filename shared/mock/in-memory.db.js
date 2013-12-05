angular.module('ngMockBackend').factory(

  // factory name
  'DataStore', 

  // factory dependencies injection
  [

// factory definition
function() {

  // http://lokijs.org/
  return new loki('mock.db');

}]);