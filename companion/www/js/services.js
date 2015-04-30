/**
 * Created by Modou on 30/04/2015.
 */

angular.module('vc').factory('Services', function ($http) {

    return {
        discover: function (currentPosition) {
            // $http returns a promise, which has a then function, which also returns a promise
            return $http.get('url??').then(function (response) {
                return response.data; // Json Struct ?
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
        }
    };
});