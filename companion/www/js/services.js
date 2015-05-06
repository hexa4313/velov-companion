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
            var url = VCConstants.DOMAIN_URL+'/'+VCConstants.PATH+ '/station?';
            url += "lng=" + currentPosition.lng +
                   "&lat=" + currentPosition.lat +
                   "&radius=" + radius;
            return $http.get(url).then(function (response) {
                return response.data;
            });
        },
        setAuthToken : function(token) {
            var authData = "id: "+ token;
            $http.defaults.headers.common['Authorization'] = 'Basic ' + authData;
        },
        clearAuthToken : function() {
            $http.defaults.headers.common['Authorization'] = 'Basic';
        },
        register: function (email, passw) {

            // $http returns a promise, which has a then function, which also returns a promise
            var url = VCConstants.DOMAIN_URL+'/'+VCConstants.PATH+ '/user';
            var signData = {
                email: email,
                password: passw
            };
            return $http.post(url, signData).then(function (response) {
                return response.data;
            });
        },
        login: function (mail, passw) {
            var url = VCConstants.DOMAIN_URL+'/'+VCConstants.PATH+ '/user?';
            url += "email=" + mail +
            "&password=" + passw;
            return $http.get(url).then(function (response) {
                return response.data;
            });
        },
        getToken: function (mail, passw) {
            var url = VCConstants.DOMAIN_URL+'/'+VCConstants.PATH+ '/token?';
            url += "email=" + mail +
            "&password=" + passw;
            return $http.get(url).then(function (response) {
                return response.data;
            });
        },
        getPerformance: function () { // TODO add Token
            var url = VCConstants.DOMAIN_URL+'/'+VCConstants.PATH+ '/performance';
            authData = "id : " + token;
            return $http.get(url).then(function (response) {
                return response.data;
            });
        },
        createPerformance: function (perf) {
            var url = VCConstants.DOMAIN_URL+'/'+VCConstants.PATH+ '/performance';
            return $http.post(url, perf).then(function (response) {
                return response.data;
            });
        },
        getBookmarks: function () {
            var url = VCConstants.DOMAIN_URL+'/'+VCConstants.PATH+ '/station/bookmark/';
            return $http.get(url).then(function (response) {
                return response.data;
            });
        },
        addBookmark: function (idStation) {
            var url = VCConstants.DOMAIN_URL+'/'+VCConstants.PATH+ '/station/bookmark/';
            url += idStation;
            return $http.put(url).then(function (response) {
                return response.data;
            });
        },
        removeBookmark: function (idStation) {
            var url = VCConstants.DOMAIN_URL+'/'+VCConstants.PATH+ '/station/bookmark/';
            url += idStation;
            return $http.delete(url).then(function (response) {
                return response.data;
            });
        },
        getRoadmap: function (deptLng, deptLat, destLng, destLat, profile) {
            var url = VCConstants.DOMAIN_URL+ '/brouter?';
            url += "lonlats=" + deptLng + ","+ deptLat + "|" + destLng + ","+ destLat +
                "&nogos&profile=" + profile +
                "&alternativeidx=0&format=geojson";
            return $http.get(url).then(function (response) {
                return response.data;
            });
        },
        getStation: function (idStation) { //TODO
            var url = VCConstants.DOMAIN_URL+'/'+VCConstants.PATH+ '/station?'+ idStation;
            return $http.get(url).then(function (response) {
                return response.data;
            });
        },
        getAllStations: function (currentPosition, radius) {
            if(!radius) {
                radius = 1000000;
            }
            // $http returns a promise, which has a then function, which also returns a promise
            var url = VCConstants.DOMAIN_URL+'/'+VCConstants.PATH+ '/station?';
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
        autocomplete: function(currentPosition, query) { // TODO
            var url = VCConstants.DOMAIN_URL+':'+VCConstants.PORT+'/autocomplete?';
            url += "q=" + query +
                   "&lon=" + currentPosition.lng +
                   "&lat=" + currentPosition.lat;
            return $http.get(url).then(function (response) {
                return response;
            });
        }
    };
});

angular.module('vc').factory('VCConstants', function () {
    return {
        DOMAIN_URL: 'http://91.229.95.103',
        PORT: '8080',
        PATH: 'api'
    };
});