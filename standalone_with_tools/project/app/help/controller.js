angular.module('app').controller(

  // controller name
  'HelpCtrl',

  // dependencies injection
  ['$scope', '$http',

// controller definition
function($scope, $http) {

  $scope.pageName = 'Help Page';

  $http.get('https://api.github.com/users/erkobridee').success(function(data) {
    console.log(data);
  });

}]);