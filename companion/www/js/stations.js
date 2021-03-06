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
                for(var i=0;i<$localStorage['stations'].length;i++){
                    var stt = $localStorage['stations'][i];
                //for(stt of $localStorage['stations']) {
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
                console.log($localStorage['bookmarks']);
                if(!$localStorage['bookmarks']) {
                    return false;
                }
                var result = false;
                for(var i=0;i<$localStorage['bookmarks'].length;i++){
                    var bm = $localStorage['bookmarks'][i];
                    if( bm != null && bm.number == idBookmark) {
                        result= true;
                        break;
                    }
                };
                return result;
            },
            hasBookmark : function () {
                return ($localStorage['bookmarks']? true : false)
            },
            removeBookmark: function(idBm) {
                if($localStorage['bookmarks']) {
                    var bookmarks = $localStorage['bookmarks'];
                    for (var i = 0; i < bookmarks.length; i++) {
                        if (bookmarks[i].id === parseInt(idBm)) {
                            bookmarks.splice(i, 1);
                            break;
                        }
                    }
                    $localStorage['bookmarks'] = bookmarks;
                }

            },
            addBookmark: function(station) {
                var bookmarks = [];
                if($localStorage['bookmarks']) {
                    bookmarks = $localStorage['bookmarks'];
                }
                bookmarks.splice(1, 0, station);
                $localStorage['bookmarks'] = bookmarks;

            },
            addPerformance: function(perf) {
                var perfs = [];
                if($localStorage['performance']) {
                    perfs = $localStorage['performance'];
                }
                perfs.splice(1, 0, perf);
                $localStorage['performance'] = perfs;

            },
            getPerformance: function() {
                if(!$localStorage['performance']) {
                    $localStorage['performance'] = [] ;
                }
                return $localStorage['performance'];

            },
            setAllStations: function (allStations) {
                $localStorage['allStations'] = allStations;
            },
            getAllStations: function () {
                return $localStorage['allStations'];
            }
        };

});

