angular.module('vc.bookmark', [])

.controller('BookmarkCtrl', function($scope) {
  $scope.bookmark = [
    { title: 'Bellecour', id: 0 },
    { title: 'Part Dieu', id: 1 },
    { title: 'Cordelier', id: 2 },
    { title: 'Charpennes', id: 3 }
  ];
})