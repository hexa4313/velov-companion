/**
 * Created by Modou on 29/04/2015.
 */
angular.module('vc.roadmap', ['ngRoute'])
    .controller('RoadmapCtrl', function($scope, $rootScope, $stateParams, Services, Bookmarks){

        // for $routeParams --> bower install a$scope.pageTitle = 'Itinéraire';ngular-route
        $rootScope.pageTitle = "Itinéraire";
        $scope.locations = {from : {}, dest : {}};
        $scope.roadmapType = '';
        // test
        //$scope.locations.from  = {name:'Villeurbanne',lng: 4.871454, lat: 45.784011};
        //$scope.locations.dest  = {name:'Bellecour', lat:4.938827, lng:45.709621};
        $scope.init = function(){

            if($stateParams.stationId)
            {
                // Case the user has already selected a from station
                var idStation = parseInt($stateParams.stationId);
                $scope.locations.from  = Bookmarks.get(idStation);
            }
            else{
                // simple case (nothing is selected)
            }
        }

        $scope.findRoadmap = function() {


            console.log($scope.roadmapType);
            if($scope.locations.from.name && $scope.locations.dest.name){

                // TODO request Services.getRoadmap + how to display it?
            }
            else{
                alert("Vous devez choisir une adresse ou station de départ et une destination");
            }
        }

        $scope.reverseLocation = function() {

            var tmp = {};
            tmp = $scope.locations.from;
            $scope.locations.from = $scope.locations.dest;
            $scope.locations.dest = tmp;
        }


        // Start controller
        $scope.init();
    });
