/**
 * Created by Modou on 02/05/2015.
 */
angular.module('vc.perf', ['angularCharts'])

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

        $scope.config = {
            title: 'performance',
            tooltips: true,
            labels: false,
            click : function() {},
            mouseover : function() {},
            mouseout : function() {},
            legend: {
              display: true,
              position: 'right'
            }
        };

        Date.prototype.yyyymmdd = function() {
           var yyyy = this.getFullYear().toString();
           var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
           var dd  = this.getDate().toString();
           return  (dd[1]?dd:"0"+dd[0]) + "/" + (mm[1]?mm:"0"+mm[0]) + "/"+ yyyy ; // padding
        };

        $scope.data = {
            series: ['Performance'],
            data: [{
              x: $scope.perfs[0].datePerf.yyyymmdd(),
              y: [parseInt($scope.perfs[0].duree)],
              tooltip: $scope.perfs[0].datePerf.yyyymmdd() + ": "+ $scope.perfs[0].duree
            }, {
              x: "Jour 2",
              y: [parseInt($scope.perfs[1].duree)],
              tooltip: $scope.perfs[0].datePerf.yyyymmdd() + ": "+ $scope.perfs[0].duree
            }, {
              x: "Jour 3",
              y: [40],
              tooltip: $scope.perfs[0].datePerf.yyyymmdd() + ": 40mn"
            }, {
              x: "Jour 4",
              y: [0],
              tooltip: $scope.perfs[0].datePerf.yyyymmdd() + ": 0mn"
            }, {
              x: "Jour 5",
              y: [30],
              tooltip: $scope.perfs[0].datePerf.yyyymmdd() + ": 30mn"
            }]
          };
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