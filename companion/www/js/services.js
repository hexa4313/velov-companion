/**
 * Created by Modou on 30/04/2015.
 */

angular.module('vc').factory('Services', function ($http) {

    const HOST_URL = "http://localhost:5000/api/";

    return {
        discover: function (currentPosition, radius) {
            if(!radius) {
                radius = 1000;
            }
            // $http returns a promise, which has a then function, which also returns a promise
            var url = HOST_URL + 'station?';
            url += "lng=" + currentPosition.lng +
                   "&lat=" + currentPosition.lat +
                   "&radius=" + radius;
            return $http.get(url).then(function (response) {
                return response.data;
            });
        },
        getUser: function (userID) {
            return $http.get('url??').then(function (response) {
                return response.data;
            });
        },
        getPerformance: function (userID) {
            return $http.get('url??').then(function (response) {
                return response.data;
            });
        },
        getBookmarks: function (userID) {
            return $http.get('url??').then(function (response) {
                return response.data;
            });
        },
        search: function (str) {
            return $http.get('url??').then(function (response) {
                return response.data;
            });
        },
        getRoadmap: function (departture, destination) { //locations {lat, lng}
            return $http.get('url??').then(function (response) {
                return response.data;
            });
        },
        getStation: function (idStation) {
            return $http.get('url??').then(function (response) {
                return response.data;
            });
        },

        startBike: function(userID, departureLocation, dateDepart) {
            return $http.put('URL').then(function (response) {
                return response.data;
            });
        },
        autocomplete: function(currentPosition, query) {
            var url = "http://photon.komoot.de/api/?";
            url += "q=" + query
                   "lon=" + currentPosition.lng +
                   "&lat=" + currentPosition.lat;
            return $http.put(url).then(function (response) {
                return response;
            });
        }
    };
});