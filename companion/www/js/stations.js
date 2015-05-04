angular.module('vc').factory('Stations', function ($localStorage) {

        return {
            setStations: function (stations) {
                $localStorage['stations'] = stations;
            },
            getStations: function () {
                return $localStorage['stations'];
            },
            getStationByNumber: function(id) {
                if(!$localStorage['stations']) {
                    return null;
                }
                for(stt of $localStorage['stations']) {
                    if(stt.number == id) {
                        return stt;
                    }
                }
            }
        };

});