angular.module('curates.myCollections', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('myCollections', {
    url: '/',
    templateUrl: 'modules/myCollections/myCollections.html',
    controller: 'myCollectionsController'
  });
})

.controller('myCollectionsController', function($scope, $stateParams, collectionFactory) {
  // var user = userManagement.user;
  $scope.loggedIn;
  $scope.email;
  $scope.$watch("email", function(emayle){
    console.log(emayle);
  })

  $scope.logz = function(){
    console.log($scope.email)
    collectionFactory.getChromeUserCollections($scope.email).then(function(response){
      console.log(response);
      $scope.loggedIn = true;
    })
  }
  // collectionFactory.getUserCollections().then(function(collections) {
  //   $scope.collections = collections;
  //   var log = function(){
  //     collectionFactory.loggedIn(function(status){
  //       $scope.loggedIn = status;
  //     });
  //   }
  //   log();

  // });
});

