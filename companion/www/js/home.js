angular.module('vc.home', ['ngStorage'])

.controller('HomeCtrl', function($scope, $rootScope, Services, geoLocation, $q, Stations){

        // to get it : <cordova plugin add cordova-plugin-geolocation> + bower install ngstorage
        //var posOptions = {timeout: 10000, enableHighAccuracy: false};

        /**
         * Iitialize start view
         */
        $rootScope.pageTitle = "Velo'V Companion";
         function findMe(){

             var deferred = $q.defer();

            var onSuccess = function(position)  {
                geoLocation.setGeolocation(position.coords.latitude, position.coords.longitude);
                deferred.resolve(position);
            };
            function onError(err) {
                console.log('get geolocation position error');
                console.log(err);
                geoLocation.setGeolocation(4.85, 45.76);// Lyon centre
                deferred.reject('Cannot find your position');
            };
             ionic.Platform.ready(function() {
                navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 30000 });
             });
            return deferred.promise;
        }

        $scope.start = function(){

            var promise  = findMe();
            promise.then(function(position) {

                var currentPosition = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                $scope.map.setPosition(currentPosition);
                Services.discover(currentPosition).then(function(result){
                        $scope.map.addStations(result);
                        Stations.setStations(result);
                    },
                    // error handling
                    function(){
                        //window.alert('Unavailable service, please re-try later !');
                    });

                Services.getAllStations(currentPosition).then(function(allstations){
                        Stations.setAllStations(allstations);
                    },
                    // error handling
                    function(){
                        console.log('cannot get all stations !');
                    });
            });
        };

    $scope.map = (function(elemId) {
        defaultCenter = {
            lon: 4.871454,
            lat: 45.784011,
            zoom: 17
        }
        var southWest = L.latLng(45.709621, 4.938827),
            northEast = L.latLng(45.803759, 4.777122),
            bounds = L.latLngBounds(southWest, northEast);

        var redIcon = L.divIcon({
            className: 'station-red-marker',
            html: '<i class="icon ion-android-bicycle"></i>',
            iconSize: [35, 35],
            iconAnchor: [35, 35]
        });

        var greyIcon = L.divIcon({
            className: 'station-grey-marker',
            html: '<i class="icon ion-android-bicycle"></i>',
            iconSize: [35, 35],
            iconAnchor: [35, 35]
        });

        var orangeIcon = L.divIcon({
            className: 'station-orange-marker',
            html: '<i class="icon ion-android-bicycle"></i>',
            iconSize: [35, 35],
            iconAnchor: [35, 35]
        });

        var meIcon = L.divIcon({
            className: 'me-marker',
            html: '<div class="me-pin"></div><div class="me-pulse"></div>',
            iconSize: [35, 35],
            iconAnchor: [35, 35]
        });

        var map = L.map(elemId, {
            maxBounds: bounds
        });

        L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            maxZoom: 18
        }).addTo(map);

        var position = L.latLng(defaultCenter.lat, defaultCenter.lon);
        map.setView(position, defaultCenter.zoom);

        return {
            addStations: function(stations) {
                var markerArray = [];
                for(stt of stations){
                    var content = '<strong><a href="#/details/' + stt.number + '">' + stt.name +
                                  '</strong><br><div class="av-bikes-div"><i class="icon ion-android-bicycle"></i> ' +
                                  stt.available_bikes +
                                  '</div><div class="av-stands-div"> <i class="icon ion-ios-home"></i> ' +
                                  stt.available_bike_stands +
                                  '</div></a>';
                    var popup = L.popup().setContent(content);
                    var icon = redIcon;
                    if(!stt.available_bikes) {
                        var icon = greyIcon;
                    } else if(!stt.available_bike_stands) {
                        icon = orangeIcon;
                    }
                    var marker = L.marker([stt.position.latitude, stt.position.longitude], {
                        icon: icon
                    }).addTo(map).bindPopup(popup, {
                        offset: [-16, -10]
                    });
                    markerArray.push(marker);
                }
                var group = new L.featureGroup(markerArray);
                setTimeout(function(){
                    map.fitBounds(group.getBounds().pad(0.1));
                },500);
            },

            setPosition: function(position) {
                map.setView([position.lat, position.lng], defaultCenter.zoom);
                var marker = L.marker([position.lat, position.lng], {
                    icon: meIcon
                }).addTo(map);
                marker.on('click', function() {
                    map.setView([position.lat, position.lng]);
                });
            }
        }
    })("main-map");

        $scope.start();
});
