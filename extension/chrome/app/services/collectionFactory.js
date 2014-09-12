angular.module('curates.collectionFactory', [])
.factory('collectionFactory', function($http){
  // var baseUrl = 'http://curates.azurewebsites.net';
  var baseUrl = 'http://localhost:3000'
  var getCollection = function(url) {
    return $http({
      method: 'GET',
      url: baseUrl + '/api/collection/' + url
    }).then(function(response) {
      if (response.data === 'null') {
        return null;
      }
      return response.data;
    });
  };

  var getListData = function() {
    return $http({
      method: 'GET',
      url: baseUrl + '/api/all'
    }).then(function(response) {
      return response.data;
    });
  };

  var getUserCollections = function(user) {
    return $http({
      method: 'GET',
      url: baseUrl + '/api/user/'
    }).then(function(response) {
      return response.data;
    });
  };
  
  var getChromeUserCollections = function(user) {
    console.log(user)
    return $http({
      method: 'POST',
      data: JSON.stringify({user: user}),
      url: baseUrl + '/api/chrome/'
    }).then(function(response) {
      return response.data;
    });
  };

  var updateCollection = function(collection) {
    return $http({
      method: 'POST',
      url: baseUrl + '/api/collection/update',
      data: collection
    }).then(function(response) {
      return response.data;
    });
  };

  var createCollection = function(collection) {
    return $http({
      method: 'POST',
      url: baseUrl + '/api/collection/create',
      data: collection
    }).then(function(response) {
      return response.data;
    });
  }

  var getUser = function(){
    return $http.get('/get-user');
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

  return {
    getChromeUserCollections: getChromeUserCollections,
    getCollection: getCollection,
    getListData: getListData,
    getUserCollections: getUserCollections,
    updateCollection: updateCollection,
    createCollection: createCollection,
    loggedIn: loggedIn, 
    getUser: getUser
  };

})
