/**
 * Created by Modou on 02/05/2015.
 */
angular.module('vc.perf', ['angularCharts'])

    .controller('PerformanceCtrl', function($scope,$rootScope, Services){

        $rootScope.pageTitle = "Performances";
        $scope.init = function () {

        }

        $scope.config = {
            title: 'performance',
            tooltips: true,
            labels: false,
            mouseover: function() {},
            mouseout: function() {},
            click: function() {},
            legend: {
              display: true,
              //could be 'left, right'
              position: 'right'
            }
          };




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

        Date.prototype.yyyymmdd = function() {
           var yyyy = this.getFullYear().toString();
           var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
           var dd  = this.getDate().toString();
           return  (dd[1]?dd:"0"+dd[0]) + "/" + (mm[1]?mm:"0"+mm[0]) + "/"+ yyyy ; // padding
        };

        console.log($scope.perfs[1].datePerf.yyyymmdd());

        $scope.data = {
            series: ['Performance'],
            data: [{
              x: $scope.perfs[0].datePerf.yyyymmdd(),
              y: [parseInt($scope.perfs[0].duree)],
              tooltip: "this is tooltip"
            }, {
              x: "Jour 2",
              y: [parseInt($scope.perfs[1].duree)]
            }, {
              x: "Jour 3",
              y: [40]
            }, {
              x: "Jour 4",
              y: [0]
            }, {
              x: "Jour 5",
              y: [30]
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