angular.module('vc.bookmarks', [])

.controller('BookmarksCtrl', function($scope, $rootScope,$q, Services, UserService, Stations) {

    $rootScope.pageTitle = "Favoris";
    $scope.showList = true;
    $scope.user = UserService.getUser();
        console.log('$scope.user');
        console.log($scope.user);
    $scope.isBookmark = false;
    var star = true;

        function getToken(){

            var deferred = $q.defer();
            Services.getToken($scope.user.email, $scope.user.password).then(function(result){

                    console.log(result);
                    UserService.setUserToken(result);
                    deferred.resolve(result);
                },
                // error handling
                function(){
                    deferred.reject('Cannot get a token for the user');
                });
            return deferred.promise;
        }

    $scope.init = function() {

        if(Stations.hasBookmark())
        {
            $scope.bookmarks = Stations.getBookmarks();
        }
        else {

            if(!UserService.hasUserToken())
            {
                getToken().then(function(token) {
                    console.log(token);
                    UserService.setUserToken(token);

                    Services.getBookmarks().then(function(result){
                            console.log(result);
                            $scope.bookmarks = result;
                            Stations.setStations(result);
                        },
                        // error handling
                        function(){
                            console.log("Erreur sur l'obtention des favoris !")
                        });
                }, function(error) {
                    console.error(error)
                });
            }

           // var token = UserService.getUserToken();
            // set Authorization token
          //Services.setAuthToken(token.hash);

        }

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

        $scope.init();
});


