/**
 * Created by Modou on 29/04/2015.
 */
angular.module('vc.roadmap', ['ngRoute','ion-autocomplete'])
    .controller('RoadmapCtrl', function($scope, $rootScope, $state, $q, $stateParams, Services, Stations, geoLocation){

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
                $scope.locations.from  = Stations.getStationByNumber(idStation);
            }
            else{
                // simple case (nothing is selected)
            }
        }

       /* function getRoadmap(deptLng, deptLat, destLng, destLat, profile) {
            var deferred = $q.defer();

            setTimeout(function() {
                Services.getRoadmap(deptLng, deptLat, destLng, destLat, profile).then(function(result){
                        deferred.resolve(result);
                    },
                    // error handling
                    function(){
                        deferred.reject("Erreur sur l'obtention de l'itinéraire !");
                    });
            }, 10000);

            return deferred.promise;
        }*/
        /*
        **/
        $scope.findRoadmap = function() {

            $scope.locations.dest = Stations.getStationByNumber(10080);
            if($scope.locations.from.name && $scope.locations.dest.name){

                if($scope.roadmapType === ''){
                    $scope.roadmapType = "safety";
                }

                /*var promise = getRoadmap($scope.locations.from.position.longitude, $scope.locations.from.position.latitude,
                    $scope.locations.dest.position.longitude, $scope.locations.dest.position.latitude,
                    $scope.roadmapType);
                promise.then(function(roadmap) {
                    $rootScope.roadmap = roadmap;
                    console.log('itineraire result');
                    console.log(roadmap);
                    $state.go("navigation");
                }, function(reason) {
                    console.log(reason);
                });*/
                Services.getRoadmap($scope.locations.from.position.longitude, $scope.locations.from.position.latitude,
                    $scope.locations.dest.position.longitude, $scope.locations.dest.position.latitude,
                    $scope.roadmapType).then(function(result){
                        $rootScope.roadmap = result;
                        console.log('itineraire result');
                        console.log(result);
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
            // Get the current position
            var currentPosition = {
              lat: geoLocation.getGeolocation().lat,
              lng: geoLocation.getGeolocation().lng
            };
            Services.autocomplete(currentPosition, query).then(function(result){
                console.log(result);
                },
                // error handling
                function(){
                    //window.alert('Unavailable service, please re-try later !');
            });

        }


        // Start controller
        $scope.init();

    });
