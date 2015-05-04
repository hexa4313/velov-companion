angular.module('vc.inscriptionController', [])

.controller('inscriptionController', function($scope,$rootScope, LoginService,inscriptionService,UserService, $ionicPopup, $state, $http) {
    
    $scope.data = {};
    $scope.user = {};
    
    
     $scope.inscription = function() {
     inscriptionService.inscription($scope.data.first_name, $scope.data.last_name,$scope.data.email,$scope.data.password,$scope.data.birthday,$scope.data.numAbonne,$scope.data.codePin, $http).success(function(data) {
         $scope.user=UserService.getUser();
         LoginService.loginUser($scope.user.email, $scope.user.password,$scope.user.numAbonne,$scope.user.codePin, $http);
            $state.go("profil");
            
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'inscription failed!',
                template: 'Please retry!'
            });
        });
     }
})