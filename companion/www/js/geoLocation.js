/**
 * Created by Modou on 30/04/2015.
 */

angular.module('vc').factory('geoLocation', function ($localStorage) {

    return {
        setGeolocation: function (latitude, longitude) {
            var userPosition = {
                latitude: latitude,
                longitude: longitude
            };
            $localStorage['geoLocation'] = userPosition;
        },
        getGeolocation: function () {
            return glocation = {
                lat: $localStorage['geoLocation'].latitude,
                lng: $localStorage['geoLocation'].longitude
            }
        }
    };

});