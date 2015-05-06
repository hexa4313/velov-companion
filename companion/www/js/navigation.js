/**
 * Created by Modou on 06/05/2015.
 */
angular.module('vc.navigation', ['ngRoute'])
    .controller('NavigationCtrl', function($scope, $rootScope, $state, Stations){

        $scope.init = function() {
            if(!$rootScope.roadmap) {
                $state.go("roadmap");
            }

            $scope.roadmap = $rootScope.roadmap; // r
            $scope.addNewPerformance($scope.roadmap.features[0].properties);
            console.log("Salut Navig");
        }

        $scope.addNewPerformance  = function(properties) {
            /* 0:  "Longitude"
             1:  "Latitude"
             2:  "Elevation"
             3:  "Distance"
             4:  "CostPerKm"*/
            var distance = 0;
            console.log($scope.roadmap.features[0].properties);
            var  cost = (properties.cost? parseInt(properties.cost) : 0);
            if(properties.messages){
                for(var i = 1; i < properties.messages.length; i++){
                    var currentDistance = parseInt(properties.messages[i][3]);
                    distance += currentDistance;
                    //cost += (currentDistance / 1000) * parseInt(properties.messages[i][4]);
                }
                distance = distance / 1000;
               var perf =  {
                    datePerf : new Date(),
                    vitesse : "10km/h",
                    duree : "13mn",
                    dateDepart : "08h18",
                    dateArrivee : "08h31",
                    stationDepart : $rootScope.locations.from.name,
                    stationArrivee : $rootScope.locations.dest.name,
                    distance : distance,
                    cost : cost
                };
                Stations.addPerformance(perf);
               /* Stations.addPerformance(perf);
                Stations.addPerformance(perf);
               Stations.addPerformance(perf);*/
            }

        }
        $scope.map = (function(elemId) {
            defaultCenter = {
                lon: 4.871454,
                lat: 45.784011,
                zoom: 20
            }
            var southWest = L.latLng(45.709621, 4.938827),
                northEast = L.latLng(45.803759, 4.777122),
                bounds = L.latLngBounds(southWest, northEast);

            var destIcon = L.divIcon({
                className: 'dest-marker',
                html: '<i class="icon ion-android-bicycle"></i>',
                iconSize: [35, 35],
                iconAnchor: [35, 35]
            });

            var meIcon = L.divIcon({
                className: 'me-marker',
                html: '<div class="me-pin"></div>',
                iconSize: [35, 35],
                iconAnchor: [35, 35]
            });

            var myStyle = {
                "color": "#ff7800",
                "weight": 5,
                "opacity": 0.65
            };

            var map = L.map(elemId, {
                maxBounds: bounds
            });

            L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
                maxZoom: 18
            }).addTo(map);

            var position = L.latLng(defaultCenter.lat, defaultCenter.lon);
            map.setView(position, defaultCenter.zoom);

            return {
                addRoute: function(geoJSON) {
                    L.geoJson(geoJSON, {
                        style: myStyle
                    }).addTo(map);
                }
            }
        })("nav-map");

        $scope.init();
    });