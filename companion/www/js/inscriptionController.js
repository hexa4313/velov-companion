angular.module('vc.inscriptionController', [])

.controller('inscriptionController', function($scope,$rootScope, Services,UserService, $ionicPopup, $state) {
    
    $rootScope.pageTitle = "Inscription";
    $scope.data = {};
    $scope.user = {};



        $scope.register = function() {

            Services.register($scope.data.email, $scope.data.password).then(function(user){
                   var userData = {email: user.email, password:$scope.data.password, id:user.id};
                   $scope.user = userData;
                    UserService.setUser(userData);
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