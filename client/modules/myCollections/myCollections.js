angular.module('curates.myCollections', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('myCollections', {
    url: '/myCollections',
    templateUrl: 'modules/myCollections/myCollections.html'
  });
})

.controller('myCollectionsController', function($scope, $stateParams, collectionFactory) {
  $scope.collections = [];

  collectionFactory.getUserCollections().then(function(collections) {
    console.log(collections);
    $scope.collections = collections;
  });
});
