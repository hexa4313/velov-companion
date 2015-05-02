angular.module('vc.loginController', [])

.controller('loginController', function($scope, LoginService, $ionicPopup, $state, $http) {
    $scope.data = {};
    $scope.user = {};
    if(LoginService.isLogged()){
        $scope.user = LoginService.getUser();
    }
            
    $scope.isLogged = function() { return LoginService.isLogged(); }
    
    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password, $http).success(function(data) {
            
            $state.reload();
            
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }
})

