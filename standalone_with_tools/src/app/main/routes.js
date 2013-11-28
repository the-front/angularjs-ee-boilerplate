angular.module('app').config(

  // dependencies injection
  ['$routeProvider',

// routes definition
function ($routeProvider) {

  $routeProvider
    .when(
      '/',
      {
        controller: 'HomeCtrl',
        templateUrl: 'app/home/tpl.html'
      }
    )
    .when(
      '/about',
      {
        controller: 'AboutCtrl',
        templateUrl: 'app/about/tpl.html'
      }
    )
    .when(
      '/help',
      {
        controller: 'HelpCtrl',
        templateUrl: 'app/help/tpl.html'
      }
    )
    .when(
      '/404',
      {
        templateUrl: 'app/404/tpl.html'
      }
    )

    .otherwise({redirectTo:'/404'});

}]);