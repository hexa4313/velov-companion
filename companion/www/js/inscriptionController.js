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
})