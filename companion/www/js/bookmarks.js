angular.module('vc.bookmarks', [])

.controller('BookmarksCtrl', function($scope, $rootScope, Bookmarks) {

    $rootScope.pageTitle = "Favoris";
    $scope.showList = true;
    $scope.bookmarks = Bookmarks.all();
    var star = true;

  $scope.remove = function(bookmark) {
    Bookmarks.remove(bookmark);
  }
  /*$scope.getColor = function(elem) {
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
    //$scope.showList = false;
    $scope.path = "/img/bookmark_gold.png";
  }

  $scope.back = function() {
    //$scope.showList = true;
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
  }*/
})

.factory('Bookmarks', function() {
  // Might use a resource here that returns a JSON array

      // TODO must have lat and lng for bookmarks
  var bookmarks = [{
    id: 1,
    name: 'Bellecour',
    bike:'4',
    parking:'6'
  }, {
    id: 2,
    name: 'Part Dieu',
    bike:'2',
    parking:'10'
  }, {
    id: 3,
    name: 'Cordelier',
    bike:'1',
    parking:'0'
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


