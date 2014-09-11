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
  
  
  collectionFactory.getUserCollections().then(function(collections) {
    $scope.collections = collections;
  });
});
