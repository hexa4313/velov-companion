/**
 * Created by Modou on 30/04/2015.
 */

angular.module('vc').factory('Services', function ($http) {

    return {
        discover: function (currentPosition) {
            // $http returns a promise, which has a then function, which also returns a promise
            var url = ''; //'https://download.data.grandlyon.com/ws/rdata/jcd_jcdecaux.jcdvelov/all.json';
            return $http.get(url).then(function (response) {
                var stations = [];
                // Convert stations arrays to station objects
                /*for(entry of response.data.values) {
                    var station = {};
                    for(var i=0; i < entry.length; i++) {
                        station[response.data.fields[i]] = entry[i];
                    }
                    stations.push(station);
                }*/
                return stations;
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