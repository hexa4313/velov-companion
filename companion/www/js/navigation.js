/**
 * Created by Modou on 06/05/2015.
 */
angular.module('vc.navigation', ['ngRoute'])
    .controller('NavigationCtrl', function($scope, $rootScope, $state){

        console.log($scope.roadmap);
        $scope.init = function() {
            if(!$rootScope.roadmap) {
                $state.go("roadmap");
            }

            $scope.roadmap = $rootScope.roadmap; // r
            console.log("Salut Navig");
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
    });