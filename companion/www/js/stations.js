angular.module('vc').factory('Stations', function ($localStorage) {

        return {
            setStations: function (stations) {
                $localStorage['stations'] = stations;
            },
            getStations: function () {
                return $localStorage['stations']
            }
        };

});