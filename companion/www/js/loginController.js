angular.module('vc.loginController', [])

.controller('loginController', function($scope, $rootScope, LoginService, $ionicPopup, $state) {

        $rootScope.pageTitle = " - Connexion";
        $scope.data = {};
 
    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $rootScope.pageTitle = "- Profil"
            $state.go('profilConnecte');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }
})

