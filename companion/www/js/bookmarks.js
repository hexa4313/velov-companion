angular.module('vc.bookmarks', [])

.controller('BookmarksCtrl', function($scope, $rootScope, Services, UserService, Bookmarks, Stations) {

    $rootScope.pageTitle = "Favoris";
    $scope.showList = true;
    $scope.user = UserService.getUser();
    $scope.isBookmark = false;
    $scope.bookmarks = Bookmarks.all();
    var star = true;

      // TODO Remove Bookmarks factory
    $scope.init = function() {

      Services.getBookmarks($scope.user.id).then(function(result){
        console.log(result);
            $scope.bookmarks = result;
            Stations.setStations(result);
      },
        // error handling
      function(){
            console.log("Erreur sur l'obtention des favoris !")
      });
    }
  $scope.remove =  function(bookmark) {
    //TODO Request to push delete operation
    Bookmarks.remove(bookmark);
    Stations.remove(bookmark.id);
  }

  $scope.add =  function(station) {
    Stations.addBookmark(station);
  //TODO Request to push add operation
  }
  $scope.getColor = function(elem) {
    if (elem < 3) {
      return "color: red";
    } else if (3 <= elem && elem <= 5) {
      return "color: orange";
    } else if (5 < elem){
      return "color: green";
    }
  }

  $scope.selectBookmark = function(bookmarkId) {
    $scope.selectedBm = Bookmarks.get(bookmarkId);
    $scope.showList = false;
    $scope.path = "/img/bookmark_gold.png";
  }

  $scope.back = function() {
    $scope.showList = true;
  }

  $scope.starClick = function() {
    console.log($scope.path);
    console.log(star);
    //get element and find out if bookmark or not
    if (star) {
      $scope.path = "/img/bookmark_black.png";
      star = false;
      // remove from bookmark
    }
    else {
      $scope.path = "/img/bookmark_gold.png";
      star = true;
      // add from bookmark
    }
  }
})

.factory('Bookmarks', function() {
  // Might use a resource here that returns a JSON array

      // TODO must have lat and lng for bookmarks
  var bookmarks = [{
    id: 0,
    name: 'Bellecour',
    bike:'4',
    parking:'6'
  }, {
    id: 1,
    name: 'Part Dieu',
    bike:'2',
    parking:'10'
  }, {
    id: 2,
    name: 'Cordelier',
    bike:'1',
    parking:'0'
  }, {
    id: 3,
    name: 'Charpennes',
    bike:'10',
    parking:'6'
  }];

  return {
    all: function() {
      return bookmarks;
    },
    remove: function(bookmark) {
      bookmarks.splice(bookmarks.indexOf(bookmark), 1);
    },
    get: function(bookmarkId) {
      for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].id === parseInt(bookmarkId)) {
          return bookmarks[i];
        }
      }
      return null;
    }
  };
});


