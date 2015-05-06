/**
 * Created by Modou on 06/05/2015.
 */
angular.module('vc.navigation', ['ngRoute'])
    .controller('NavigationCtrl', function($scope, $rootScope){

        $scope.roadmap = $rootScope.roadmap; // r

        console.log("Salut Navig");
        console.log($scope.roadmap);
        $scope.init = function() {

        }
    });