angular.module('vc.inscriptionController', [])

.controller('inscriptionController', function($scope,$rootScope, LoginService,inscriptionService, $ionicPopup, $state, $http) {
    
    $scope.data = {};
    $scope.user = {};
    
    
     $scope.inscription = function() {
     inscriptionService.inscription($scope.data.first_name, $scope.data.last_name,$scope.data.email,$scope.data.password,$scope.data.birthday,$scope.data.numAbonne,$scope.data.codePin, $http).success(function(data) {
            LoginService.loginUser($scope.data.email, $scope.data.password,$scope.data.numAbonne,$scope.data.codePin, $http);
            $state.go("profil");
            
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'inscription failed!',
                template: 'Please retry!'
            });
        });
     }
})