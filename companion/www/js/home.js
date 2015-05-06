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
             navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 30000 });
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

        // TEST ROUTER

        var geoJSON = {
            "type": "LineString",
            "coordinates": [
                [4.874378, 45.784306, 170.25],
                [4.874169, 45.784260, 170.25],
                [4.873577, 45.784128, 172.0],
                [4.873104, 45.784022, 172.5],
                [4.872793, 45.783952, 171.75],
                [4.872304, 45.783843, 171.5],
                [4.872282, 45.783838, 171.5],
                [4.871772, 45.783731, 172.5],
                [4.871452, 45.783665, 172.25],
                [4.870920, 45.783535, 170.75],
                [4.870850, 45.783518, 170.75],
                [4.870873, 45.783467, 170.75],
                [4.871089, 45.782990, 171.75],
                [4.871109, 45.782944, 171.75],
                [4.871131, 45.782896, 171.75],
                [4.871257, 45.782617, 172.0],
                [4.871271, 45.782587, 172.0],
                [4.871294, 45.782535, 172.0],
                [4.871443, 45.782206, 171.75],
                [4.871457, 45.782175, 171.75],
                [4.871708, 45.781620, 171.0],
                [4.871722, 45.781589, 171.0],
                [4.871848, 45.781312, 171.25],
                [4.871886, 45.781251, 171.25],
                [4.871911, 45.781196, 171.25],
                [4.871931, 45.781140, 171.5],
                [4.871952, 45.781083, 171.5],
                [4.871729, 45.780999, 171.75],
                [4.871665, 45.780975, 171.75],
                [4.871596, 45.780960, 171.75],
                [4.871520, 45.780922, 172.0],
                [4.872090, 45.779629, 169.0],
                [4.872144, 45.779506, 169.0],
                [4.872168, 45.779453, 169.0],
                [4.872297, 45.779176, 169.0],
                [4.871015, 45.779028, 167.75],
                [4.870047, 45.778989, 168.75],
                [4.870057, 45.778899, 168.75],
                [4.870071, 45.778797, 168.75],
                [4.869951, 45.778137, 169.5],
                [4.869926, 45.777996, 170.0],
                [4.869755, 45.777328, 171.75],
                [4.871987, 45.777211, 170.75],
                [4.872097, 45.777205, 170.75],
                [4.872082, 45.777151, 170.5],
                [4.871850, 45.776323, 170.0],
                [4.871993, 45.776235, 170.0],
                [4.872102, 45.776175, 170.0],
                [4.872146, 45.775714, 170.25],
                [4.872178, 45.775166, 169.75],
                [4.872191, 45.774934, 169.5],
                [4.872203, 45.774726, 169.75],
                [4.872205, 45.774700, 169.75],
                [4.872206, 45.774682, 169.75],
                [4.872212, 45.774603, 169.75],
                [4.872317, 45.773296, 173.25],
                [4.872324, 45.773210, 173.5],
                [4.872325, 45.773158, 173.5],
                [4.872374, 45.771940, 174.5],
                [4.872376, 45.771902, 174.5],
                [4.872377, 45.771861, 174.5],
                [4.872505, 45.771865, 174.25],
                [4.873377, 45.771874, 175.75],
                [4.873492, 45.771875, 175.25],
                [4.873561, 45.771877, 175.0],
                [4.873567, 45.771849, 175.0],
                [4.873586, 45.771825, 175.0],
                [4.873617, 45.771807, 175.0],
                [4.873654, 45.771797, 174.75],
                [4.873655, 45.771746, 174.75],
                [4.873696, 45.770653, 173.0],
                [4.873697, 45.770602, 173.0],
                [4.873697, 45.770575, 173.0],
                [4.873784, 45.770558, 172.75],
                [4.874350, 45.770448, 173.25]
            ]
        }

        var myStyle = {
            "color": "#ff7800",
            "weight": 5,
            "opacity": 0.65
        };

        L.geoJson(geoJSON, {
            style: myStyle
        }).addTo(map);

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
                    var icon = stt.available_bikes ? redIcon : greyIcon;
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
