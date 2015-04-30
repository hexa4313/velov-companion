angular.module('vc.home', [])

.controller('HomeCtrl', function($scope){
	$scope.map = (function(elemId) {
		myPos = {
			lon: 4.871454,
			lat: 45.784011,
			zoom: 13
		}
		var myIcon = L.divIcon({
			className: 'station-marker',
			html: '<i class="icon ion-android-bicycle"></i>',
			iconSize: [35, 35],
			iconAnchor: [35, 35]
		});

		var map = L.map(elemId);

		L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
		    maxZoom: 18
		}).addTo(map);
		//map.locate({setView: true, maxZoom: 16});
		var position = L.latLng(myPos.lat, myPos.lon);
		map.setView(position, myPos.zoom);

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

		var marker = L.marker(position, {
			icon: myIcon
		}).addTo(map);

		return {
			addStations: function(stations) {
				for(st of stations){
					console.log(st);
				}
			}
		}

		/*
		map = new ol.Map(elemId);
    var mapnik         = new ol.Layer.OSM();
    var fromProjection = new ol.Projection("EPSG:4326");   // Transform from WGS 1984
    var toProjection   = new ol.Projection("EPSG:900913"); // to Spherical Mercator Projection
    var position       = new ol.LonLat(MyPos.lon, MyPos.lat).transform(fromProjection, toProjection);
    var zoom           = MyPos.zoom;
    var newLayer = new ol.Layer.OSM("Map", "http://b.tile.openstreetmap.fr/hot/${z}/${x}/${y}.png");
    map.addLayer(newLayer);
    map.setCenter(position, zoom);

    // Defines vector overlay
    var vectorLayer = new ol.Layer.Vector("Overlay");

    return {
    	setCenter: function(position, zoom) {
    		var position = new ol.LonLat(MyPos.lon, MyPos.lat).transform(fromProjection, toProjection);
    		var zoom     = MyPos.zoom;
    		map.setCenter(position, zoom);
    	},
    	addStations: function(stations) {
    		//GIGIDI
    	}
    };
*/
	})("main-map");
});