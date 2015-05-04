angular.module('vc.loginController', [])

.controller('loginController', function($scope,$rootScope, LoginService,UserService, $ionicPopup, $state, $http) {

    $rootScope.pageTitle = "Connexion";
    $scope.data = {};
    $scope.user = {};
    if(UserService.isLogged()){
        $scope.user = UserService.getUser();
        $rootScope.pageTitle = "Profil";
    }
            
    $scope.isLogged = function() { return UserService.isLogged(); }
    
    $scope.logout = function(){UserService.logout();  $state.reload();}
    
    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password,$scope.data.numAbonne,$scope.data.codePin, $http).success(function(data) {
            
            $state.reload();
            
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }
    $scope.inscription = function(){
        $state.go("subscription");
    }
})

