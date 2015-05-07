/**
 * Created by Modou on 29/04/2015.
 */
angular.module('vc.roadmap', ['ngRoute','ion-autocomplete'])
    .controller('RoadmapCtrl', function($scope, $rootScope, $state, $q, $stateParams, Services, Stations, geoLocation){

        // for $routeParams --> bower install a$scope.pageTitle = 'Itinéraire';ngular-route
        $rootScope.pageTitle = "Itinéraire";
        $scope.locations = {from : {}, dest : {}};
        $scope.roadmapType = '';

        $scope.selectMe = function() {
            var currentPosition = {
              lat: geoLocation.getGeolocation().lat,
              lng: geoLocation.getGeolocation().lng
            };
            $scope.mypos = {
                "name": "Ma position",
                "address": "",
                "position": {
                    "latitude": currentPosition.lat,
                    "longitude": currentPosition.lng
                }
            }
            console.log('selected');
        }

        $scope.init = function(){

            if($stateParams.stationId)
            {
                // Case the user has already selected a from station
                var idStation = parseInt($stateParams.stationId);
                $scope.locations.from  = Stations.getStationByNumber(idStation);
            }
            else{
                // simple case (nothing is selected)
            }


        }

        /*
        **/
        $scope.findRoadmap = function() {
            if($scope.locations.from.name && $scope.locations.dest.name){
                if($scope.roadmapType === ''){
                    $scope.roadmapType = "safety";
                }
                Services.getRoadmap($scope.locations.from.position.longitude, $scope.locations.from.position.latitude,
                    $scope.locations.dest.position.longitude, $scope.locations.dest.position.latitude,
                    $scope.roadmapType).then(function(result){
                        $rootScope.roadmap = result;
                        $rootScope.locations = $scope.locations;
                        $state.go("navigation");
                    },
                    // error handling
                    function(){
                        console.log("Erreur sur l'obtention de l'itinéraire !");
                    });
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

        $scope.autocompleteCallback = function(query) {
            if (query.length < 3) {
                return [];
            }
            // Get the current position
            var currentPosition = {
              lat: geoLocation.getGeolocation().lat,
              lng: geoLocation.getGeolocation().lng
            };
            return Services.autocomplete(currentPosition, query);
        }


        // Start controller
        $scope.init();

    });
