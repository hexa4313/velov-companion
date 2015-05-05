/**
 * Created by Modou on 30/04/2015.
 */

angular.module('vc').factory('Services', function ($http, VCConstants) {


    return {
        discover: function (currentPosition, radius) {
            if(!radius) {
                radius = 1000;
            }
            // $http returns a promise, which has a then function, which also returns a promise
            var url = VCConstants.DOMAIN_URL+':'+VCConstants.PORT+'/'+VCConstants.PATH+ '/station?';
            url += "lng=" + currentPosition.lng +
                   "&lat=" + currentPosition.lat +
                   "&radius=" + radius;
            return $http.get(url).then(function (response) {
                return response.data;
            });
        },
        sign: function (firstname, lastname, mail, passw, birthday) {

            // $http returns a promise, which has a then function, which also returns a promise
            var url = VCConstants.DOMAIN_URL+':'+VCConstants.PORT+'/'+VCConstants.PATH+ '/user?';
            url += "first_name=" + firstname +
            "&last_name=" + lastname +
            "&email=" + mail +
            "&password=" + passw +
            "&birthday=" + birthday;
            return $http.post(url).then(function (response) {
                return response.data;
            });
        },
        getToken: function (mail, passw) {
            var url = VCConstants.DOMAIN_URL+':'+VCConstants.PORT+'/'+VCConstants.PATH+ '/login?';
            url += "&email=" + mail +
            "&password=" + passw;
            return $http.get(url).then(function (response) {
                return response.data;
            });
        },
        getToken: function (mail, passw) {
            var url = VCConstants.DOMAIN_URL+':'+VCConstants.PORT+'/'+VCConstants.PATH+ '/token?';
            url += "&email=" + mail +
            "&password=" + passw;
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
            var url = VCConstants.DOMAIN_URL+':'+VCConstants.PORT+'/'+VCConstants.PATH+ '/performance';
            return $http.get(url).then(function (response) {
                return response.data;
            });
        },
        createPerformance: function (perf) {
            var url = VCConstants.DOMAIN_URL+':'+VCConstants.PORT+'/'+VCConstants.PATH+ '/performance';
            return $http.post(url).then(function (response) {
                return response.data;
            });
        },
        getBookmarks: function (user) {
            var url = VCConstants.DOMAIN_URL+':'+VCConstants.PORT+'/'+VCConstants.PATH+ '/station/bookmark/';
            return $http.get(url).then(function (response) {
                return response.data;
            });
        },
        addBookmark: function (idStation) {
            var url = VCConstants.DOMAIN_URL+':'+VCConstants.PORT+'/'+VCConstants.PATH+ '/station/bookmark/';
            url += idStation;
            return $http.put(url).then(function (response) {
                return response.data;
            });
        },
        removeBookmark: function (idStation) {
            var url = VCConstants.DOMAIN_URL+':'+VCConstants.PORT+'/'+VCConstants.PATH+ '/station/bookmark/';
            url += idStation;
            return $http.delete(url).then(function (response) {
                return response.data;
            });
        },
        search: function (str) {
            return $http.get('url??').then(function (response) {
                return response.data;
            });
        },
        getRoadmap: function (departure, destination) { //locations {lat, lng}
            return $http.get('url??').then(function (response) {
                return response.data;
            });
        },
        getStation: function (idStation) {
            return $http.get('url??').then(function (response) {
                return response.data;
            });
        },
        getAllStations: function (currentPosition, radius) {
            if(!radius) {
                radius = 1000000;
            }
            // $http returns a promise, which has a then function, which also returns a promise
            var url = VCConstants.DOMAIN_URL+':'+VCConstants.PORT+'/'+VCConstants.PATH+ '/station?';
            url += "lng=" + currentPosition.lng +
            "&lat=" + currentPosition.lat +
            "&radius=" + radius;
            return $http.get(url).then(function (response) {
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

angular.module('vc').factory('VCConstants', function () {
    return {
        DOMAIN_URL: 'http://localhost',
        PORT: '5000',
        PATH: 'api'
    };
});