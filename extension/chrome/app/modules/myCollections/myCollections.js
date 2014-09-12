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

    $scope.email = emayle;
  })

  $scope.logz = function(emayle){
    $scope.email = emayle;
    console.log($scope.email)
    collectionFactory.getChromeUserCollections($scope.email).then(function(response){
      $scope.collections = response;
      console.log($scope.collections)
      $scope.loggedIn = true;
    });
  }

  $scope.addLink = function(linkId) {
    // var linky = function(link){
    //   console.log(newLink);
    //   return collectionFactory.addLink(link);
    // }
    console.log('xojs', linkId)
    var newLink;
    chrome.tabs.getSelected(null, function(tab){
      newLink = {
        _id:linkId,
        links: [{
          url: tab.url, title: tab.title, description: tab.title
        }]
      };
      
      collectionFactory.addLink(newLink);
    });

  };
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

