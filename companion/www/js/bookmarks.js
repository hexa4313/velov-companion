angular.module('vc.bookmarks', [])

.controller('BookmarksCtrl', function($scope, $rootScope, Services, UserService, Stations) {

    $rootScope.pageTitle = "Favoris";
    $scope.showList = true;
    $scope.user = UserService.getUser();
    $scope.isBookmark = false;
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
});


