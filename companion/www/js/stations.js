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
            },
            setBookmarks: function (stations) {
                $localStorage['bookmarks'] = stations;
            },
            getBookmarks: function () {
                return $localStorage['bookmarks'];
            },
            isBookmark: function (idBookmark) {
                if(!$localStorage['bookmarks']) {
                    return false;
                }
                var result = false;
                for(bm of $localStorage['bookmarks']) {
                    if(bm.number == idBookmark) {
                        result= true;
                        break;
                    }
                    return result;
                };
            },
            hasBookmark : function () {
                if($localStorage['stations']) {
                    return true;
                }
                else {
                    return false;
                }
            }
        };

});