angular.module('vc.inscriptionController', [])

.controller('inscriptionController', function($scope,$rootScope, Services,UserService, $ionicPopup, $state) {
    
    $rootScope.pageTitle = "Inscription";
    $scope.data = {};
    $scope.user = {};



        $scope.register = function() {

            Services.register($scope.data.email, $scope.data.password).then(function(user){
                   $scope.user = user;
                    UserService.setUser(user);
                    $state.go("home");
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