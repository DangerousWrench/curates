angular.module('curates.services', [])
.factory('userManagement', function($http) {

  var getUser = function(){
    chrome.identity
  }

  var loggedIn = function(cb){
    getUser().then(function(res){
      var user = res.data.user;
      console.log(user);
      if(!!user){
        console.log('true');
        return cb(true);
      } else {
        return cb(false);
      }
    });
  };
  // var initUser = function() {
  //   user.givenName = '';
  //   user.id = '';
  //   user.fullName = '';
  //   user.provider = '';
  //   loggedIn = false;
  // }
  // var login = function(name) {
  //   console.log(name);
  //   user.givenName = name;
  //   user.id = name;
  //   user.fullName = name;
  //   user.provider = 'test';
  // };
  // var logout = function() {
  //   initUser();
  // };
  var validateUser = function(userId) {
    console.log(userId);
    getUser().then(function(response){
      console.log(userId === response.data.user);
      return userId === response.data.user;  
    })
  };
   return {
       getUser: getUser,
       loggedIn: loggedIn,
  //   login: login,
  //   logout: logout,
       validateUser: validateUser
   };
})
.controller('userManagementController', function($scope, userManagement) {
  // $scope.user = userManagement.user;
   $scope.loggedIn;
   var log = function(){
    userManagement.loggedIn(function(status){
      $scope.loggedIn = status;
    });
   }
   log();
  // $scope.login = function(name) {
  //   userManagement.loggedIn = true;
  //   $scope.loggedIn = true;
  //   userManagement.login(name);
  // };
  // $scope.logout = function() {
  //   userManagement.loggedIn = false;
  //   $scope.loggedIn = false;
  //   userManagement.logout();
  // }
})
