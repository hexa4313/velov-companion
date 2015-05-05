angular.module('vc.inscriptionController', [])

.controller('inscriptionController', function($scope,$rootScope, Services, LoginService,inscriptionService,UserService, $ionicPopup, $state, $http) {
    
    $rootScope.pageTitle = "Inscription";
    $scope.data = {};
    $scope.user = {};


        $scope.register = function() {

            Services.sign($scope.data).then(function(user){
                   $scope.user = user;
                    UserService.setUser(user);
                    $state.go("profil");
                },
                // error handling
                function(){
                    var alertPopup = $ionicPopup.alert({
                        title: 'Echec Inscription!',
                        template: 'Veuillez réessayer !'
                    });
                });
        }
     /*$scope.inscription = function() {
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
     }*/
})