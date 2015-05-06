/**
 * Created by Modou on 06/05/2015.
 */
angular.module('vc.navigation', ['ngRoute'])
    .controller('NavigationCtrl', function($scope, $rootScope, $state, geoLocation){

        $scope.init = function() {
            if(!$rootScope.roadmap) {
                $state.go("roadmap");
            }
            $scope.startup = true;
            $scope.roadmap = $rootScope.roadmap;
            $scope.map.addRoute($scope.roadmap.features[0].geometry);
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
                html: '<i class="icon ion-flag"></i>',
                iconSize: [35, 35],
                iconAnchor: [5, 35]
            });

            var startIcon = L.divIcon({
                className: 'start-marker',
                html: 'D',
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

            /*var getPxBounds = map.getPixelBounds;
            map.getPixelBounds = function () {
                var bounds = getPxBounds.call(this);
                // ... extend the bounds
                bounds.min.x=bounds.min.x-1000;
                bounds.min.y=bounds.min.y-1000;
                bounds.max.x=bounds.max.x+1000;
                bounds.max.y=bounds.max.y+1000;
                return bounds;
            };*/

            var startPos;
            var destPos;

            return {
                addRoute: function(geoJSON) {

                    var route = L.geoJson(geoJSON, {
                        style: myStyle
                    }).addTo(map);

                    // Get the start position
                    startPos = L.latLng(geoJSON.coordinates[0][1], geoJSON.coordinates[0][0]);

                    // Adds the start marker
                    var startMarker = L.marker(startPos, {
                        icon: startIcon
                    }).addTo(map);

                    // Get the dest position
                    destPos = L.latLng(geoJSON.coordinates[geoJSON.coordinates.length-1][1],
                                           geoJSON.coordinates[geoJSON.coordinates.length-1][0]);

                    // Adds the dest marker
                    var destMarker = L.marker(destPos, {
                        icon: destIcon
                    }).addTo(map);

                    // Get my position
                    myPos = L.latLng(geoLocation.getGeolocation());

                    // Adds my marker
                    var myMarker = L.marker(myPos, {
                        icon: meIcon
                    }).addTo(map);

                    map.fitBounds(route.getBounds().pad(0.01));
                },
                followStart: function() {
                    map.setZoomAround(startPos, 23);
                },
                followMe: function() {
                    map.setZoomAround(geoLocation.getGeolocation(), 23);
                }
            }
        })("nav-map");

        $scope.startNav = function() {
            console.log('start');
            $scope.map.followStart();
            $scope.startup = false;
            setTimeout(function(){
                $scope.startFollow();
            },2000);
        }

        $scope.startFollow = function() {
            $scope.follow();
        }

        $scope.follow = function() {
            setTimeout(function(){
                $scope.map.followMe();
            },1000);
        }

        $scope.init();
    });