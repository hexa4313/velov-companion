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
				console.log(position);
				geoLocation.setGeolocation(position.coords.latitude, position.coords.longitude);
				deferred.resolve(position);
			};
			function onError(err) {
				console.log('get geolocation position error');
				console.log(err);
				geoLocation.setGeolocation(4.85, 45.76);// Lyon centre
				deferred.reject('Cannot find your position');
			};
			navigator.geolocation.getCurrentPosition(onSuccess, onError);
			return deferred.promise;
		}
		$scope.start = function(){

			var promise  = findMe();
			promise.then(function(position) {

				var currentPosition = {
					lat: geoLocation.getGeolocation().lat,
					lng: geoLocation.getGeolocation().lng
				};
				$scope.map.setPosition(currentPosition);
				Services.discover(currentPosition).then(function(result){
						$scope.map.addStations(result);
                        $rootScope['stations'] = result;
					},
					// error handling
					function(){
						//window.alert('Unavailable service, please re-try later !');
					});
			});



		};

	$scope.map = (function(elemId) {
		defaultCenter = {
			lon: 4.871454,
			lat: 45.784011,
			zoom: 13
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
		/*map.locate({setView: true, maxZoom: 16});

		function onLocationFound(e) {
		    var radius = e.accuracy / 2;

		    L.marker(e.latlng).addTo(map)
		        .bindPopup("You are within " + radius + " meters from this point").openPopup();

		    L.circle(e.latlng, radius).addTo(map);
		}

		map.on('locationfound', onLocationFound);

		function onLocationError(e) {
		    alert(e.message);
		}

		map.on('locationerror', onLocationError);
        */

		return {
			addStations: function(stations) {
				for(stt of stations){
					//console.log(stt);
                    var content = '<strong><a href="#/details/' + stt.number + '">' + stt.name +
                                  '</strong><br><div class="av-bikes-div"><i class="icon ion-android-bicycle"></i> ' +
                                  stt.available_bikes +
                                  '</div><div class="av-stands-div"> <i class="icon ion-ios-home"></i> ' +
                                  stt.available_bike_stands +
                                  '</div></a>';
                    var popup = L.popup().setContent(content);
                    var icon = stt.available_bikes ? redIcon : greyIcon;
                    var marker = L.marker([stt.lat, stt.lng], {
                        icon: icon
                    }).addTo(map).bindPopup(popup, {
                        offset: [-16, -10]
                    });
				}
			},

            setPosition: function(position) {
                map.setView([position.lat, position.lng], defaultCenter.zoom);
                var marker = L.marker([position.lat, position.lng], {
                    icon: meIcon
                }).addTo(map);
                marker.on('click', function() {
                    console.log(position);
                    map.setView([position.lat, position.lng]);
                });
            }
		}
	})("main-map");


	var stations = [
		{
            number: 1,
			name: "Chez Modou",
			lat: 45.784011,
			lng: 4.871454,
			available_bike_stands: 10,
			available_bikes: 3,
            bike_stands: 13,
            address:  "Rue de l'INSA",
            address2: "Coté est",
            commune:  "Lyon"

		},
		{
            number: 2,
			name: "Insa Einstein",
			lat: 45.782197,
			lng: 4.876800,
			available_bike_stands: 1,
			available_bikes: 20,
            bike_stands: 25,
            address: "Avenue des Arts",
            address2: "",
            commune:  "Villeurbanne"
		},
		{
            number: 3,
			name: "Hôtel de ville",
			lat: 45.767516,
			lng: 4.836339,
			available_bike_stands: 5,
			available_bikes: 0,
            bike_stands: 6,
            address: "Avenue Gaston Berger",
            address2: "Coté oest",
            commune:  "Villeurbanne"
		},
	];
	$scope.map.addStations(stations);
    Stations.setStations(stations);

	$scope.start();

});
