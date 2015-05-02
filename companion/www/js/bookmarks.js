angular.module('vc.bookmarks', [])

.controller('BookmarksCtrl', function($scope, $rootScope, Bookmarks) {

      $rootScope.pageTitle = " - Favoris";
  $scope.showList = true;
    $scope.bookmarks = Bookmarks.all();
  $scope.remove = function(bookmark) {
    Bookmarks.remove(bookmark);
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
  }

  $scope.back = function() {
    $scope.showList = true;
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


