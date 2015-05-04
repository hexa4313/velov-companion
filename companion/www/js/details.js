angular.module('vc.details', ['ngStorage'])

.controller('DetailsCtrl', function($scope, $rootScope, Services, geoLocation, $q, $stateParams, Stations){

  $rootScope.pageTitle = "Détails Station";

  if($stateParams.stationId)
  {
      // Case the user has already selected a from station
      var idStation = parseInt($stateParams.stationId);
      $scope.station = Stations.getStationByNumber(idStation);
  }
  else{
      $state.go('home');
  }

  $scope.stationPct = {
    bikes: ($scope.station.available_bikes * 100) / $scope.station.bike_stands,
    stands: ($scope.station.available_bike_stands * 100) / $scope.station.bike_stands,
  }

  $scope.map = (function(elemId) {

    // Default center for the map
    var defaultCenter = {
      lng: 4.871454,
      lat: 45.784011,
      zoom: 13
    }

    // Max bounds for the map - restrained to Lyon
    var southWest = L.latLng(45.709621, 4.938827),
      northEast = L.latLng(45.803759, 4.777122),
      bounds = L.latLngBounds(southWest, northEast);

    // Red station icon
    var redIcon = L.divIcon({
      className: 'station-red-marker',
      html: '<i class="icon ion-android-bicycle"></i>',
      iconSize: [35, 35],
      iconAnchor: [35, 35]
    });

    // Current location coordinates
    var meIcon = L.divIcon({
        className: 'me-marker',
        html: '<div class="me-pin"></div><div class="me-pulse"></div>',
        iconSize: [35, 35],
        iconAnchor: [35, 35]
    });

    // Instantiate the Map object
    var map = L.map(elemId, {
      maxBounds: bounds
    });

    // Adds tiles
    L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        maxZoom: 18
    }).addTo(map);


    // Get the current position
    var currentPosition = {
      lat: geoLocation.getGeolocation().lat,
      lng: geoLocation.getGeolocation().lng
    };

    var position = L.latLng(currentPosition.lat, currentPosition.lng);

    // Adds the current position marker
    var marker = L.marker([position.lat, position.lng], {
        icon: meIcon
    }).addTo(map);
    marker.on('click', function() {
        console.log(position);
        map.setView([position.lat, position.lng]);
    });

    // Get the station position
    var stationPos = L.latLng(defaultCenter.lat, defaultCenter.lng);

    // Adds the target station marker
    var marker = L.marker(stationPos, {
        icon: redIcon
    }).addTo(map);

    // Polyline latLng list
    var latlngs = [
      position,
      stationPos
    ];

    //Get distance between points
    var distance = parseInt(position.distanceTo(stationPos), 10);
    if(distance > 1000) {
      var round = distance / 1000;
      round = distance.toFixed(1);
      distance =  round + "Km";
    } else {
      distance = distance.toFixed(0) + "m";
    }

    // Distance popup
    var dPopup = L.popup({
      closeButton: false,
      closeOnClick: false,
      className: 'distance-popup'
    }).setContent(distance);

    // Instantiates the polyline
    var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map).bindPopup(dPopup);
    setTimeout(function(){
      polyline.openPopup();
    },0);

    console.log(distance);

    map.setView(position, defaultCenter.zoom);
    map.fitBounds(polyline.getBounds().pad(0.1));
    map.setMaxBounds(polyline.getBounds().pad(0.1));

  })("details-map");

});