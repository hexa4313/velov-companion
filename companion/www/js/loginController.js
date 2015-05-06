angular.module('vc.loginController', [])

.controller('loginController', function($scope,$rootScope, Services, UserService, $ionicPopup, $state) {

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
            Services.login($scope.data.email, $scope.data.password).then(function(user){
                    UserService.setUser(user);
                    $state.reload();
                },
                // error handling
                function(){
                    var alertPopup = $ionicPopup.alert({
                        title: 'Echec Connexion!',
                        template: 'Connexion impossible, v!'
                    });
                });

        }
    $scope.inscription = function(){
        $state.go("subscription");
    }
})

