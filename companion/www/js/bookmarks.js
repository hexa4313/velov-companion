angular.module('vc.bookmarks', [])

.controller('BookmarksCtrl', function($scope, Bookmarks) {
  $scope.bookmarks = Bookmarks.all();
  $scope.remove = function(bookmark) {
    Bookmarks.remove(bookmark);
  }
})

.factory('Bookmarks', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var bookmarks = [{
    id: 0,
    name: 'Bellecour',
    bike:'4',
    parking:'6'
  }, {
    id: 1,
    name: 'Part Dieu',
    bike:'2',
    parking:'4'
  }, {
    id: 2,
    name: 'Cordelier',
    bike:'1',
    parking:'0'
  }, {
    id: 3,
    name: 'Charpennes',
    bike:'0',
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