/**
 * Created by Modou on 29/04/2015.
 */
angular.module('vc.roadmap', [])
    .controller('RoadmapCtrl', function($scope, $routeParams, Services){

        $scope.locations = {from : {}, dest : {}};
        $scope.init = function(){

            if($routeParams.selectedStation)
            {
                // Case the user has already selected a from station
            }
            else{
                // simple case (nothing is selected)
            }
        }

        $scope.findRoadmap = function() {

            if($scope.locations.from.name && $scope.locations.from.name){

                // TODO request Services.getRoadmap
            }
            else{
                alert("Vous devez choisir une adresse ou station de départ et une destination");
            }
        }
    });
