angular.module('vc.home', [])

.controller('HomeCtrl', function($scope){
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

		var map = L.map(elemId, {
			maxBounds: bounds
		});

		L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
		    maxZoom: 18
		}).addTo(map);
		//map.locate({setView: true, maxZoom: 16});
		var position = L.latLng(defaultCenter.lat, defaultCenter.lon);
		map.setView(position, defaultCenter.zoom);
		map.locate({setView: true, maxZoom: 16});

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

		return {
			addStations: function(stations) {
				for(stt of stations){

					var content = '<strong>' + stt.name +
					              '</strong><br><div class="av-bikes-div"><i class="icon ion-android-bicycle"></i> ' +
					              stt.available_bikes +
					              '</div><div class="av-stands-div"> <i class="icon ion-ios-home"></i> ' +
					              stt.available_bike_stands +
					              '</div>';
					var popup = L.popup().setContent(content);
					var icon = stt.available_bikes ? redIcon : greyIcon;
					var marker = L.marker([stt.lat, stt.lng], {
						icon: icon
					}).addTo(map).bindPopup(popup, {
						offset: [-16, -10]
					});
					console.log(stt);
				}
			}
		}
	})("main-map");

	var stations = [
		{
			name: "Chez Modou",
			lat: 45.784011,
			lng: 4.871454,
			available_bike_stands: 10,
			available_bikes: 3
		},
		{
			name: "Insa Einstein",
			lat: 45.782197,
			lng: 4.876800,
			available_bike_stands: 1,
			available_bikes: 20
		},
		{
			name: "Hôtel de ville",
			lat: 45.767516,
			lng: 4.836339,
			available_bike_stands: 5,
			available_bikes: 0
		},
	];

	$scope.map.addStations(stations);
});