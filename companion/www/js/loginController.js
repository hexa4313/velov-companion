angular.module('vc.loginController', [])

.controller('loginController', function($scope,$rootScope, Services, LoginService,UserService, $ionicPopup, $state, $http) {

    $rootScope.pageTitle = "Connexion";
    $scope.data = {};
    $scope.user = {};
    if(UserService.isLogged()){
        $scope.user = UserService.getUser();
        $rootScope.pageTitle = "Profil";
    }
            
    $scope.isLogged = function() { return UserService.isLogged(); }
    
    $scope.logout = function(){UserService.logout();  $state.reload();}
    
   /* $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password,$scope.data.numAbonne,$scope.data.codePin, $http).success(function(data) {
            
            $state.reload();
            
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }*/
        $scope.login = function() {
            Services.login(data.mail, data.passw).then(function(user){
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

