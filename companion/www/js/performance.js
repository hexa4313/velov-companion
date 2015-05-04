/**
 * Created by Modou on 02/05/2015.
 */
angular.module('vc.perf', [])
    .controller('PerformanceCtrl', function($scope,$rootScope, Services){

        $rootScope.pageTitle = "Performances";
        $scope.init = function () {

        }


        $scope.perfs = [];
            $scope.perfs =  [{
                datePerf : new Date(),
                vitesse : "10km/h",
                duree : "12mn",
                dateDepart : "10h30",
                dateArrivee : "10h42",
                stationDepart : "BelleCour",
                stationArrivee : "Cordier"
            },
                {
                    datePerf : new Date(),
                    vitesse : "15km/h",
                    duree : "20mn",
                    dateDepart : "09h45",
                    dateArrivee : "10h05",
                    stationDepart : "La Doua",
                    stationArrivee : "Part-Dieu"
                },
            ];

        /*
         * if given group is the selected group, deselect it
         * else, select the given group
         */
        $scope.toggleGroup = function(perf) {
            if ($scope.isGroupShown(perf)) {
                $scope.shownPerf = null;
            } else {
                $scope.shownPerf = perf;
            }
        };
        $scope.isGroupShown = function(perf) {
            return $scope.shownPerf === perf;
        };

    });