/**
 * Created by Modou on 02/05/2015.
 */
angular.module('vc.perf', ['chart.js', 'ui.bootstrap'])

    .controller('PerformanceCtrl', function($scope,$rootScope, $q, Services, UserService, Stations, $filter) {

        $rootScope.pageTitle = "Performances";

        $rootScope.$on('unauthorized', function () {
            UserService.setUserToken(null);
            getToken()
                .then(function (token) {
                    console.log(token);
                    UserService.setUserToken(token);
                }, function (error) {
                    console.error(error)
                })

        });


        function getToken() {

            var deferred = $q.defer();
            Services.getToken($scope.user.email, $scope.user.password).then(function (result) {
                    console.log(result);
                    UserService.setUserToken(result);
                    deferred.resolve(result);
                },
                // error handling
                function () {
                    deferred.reject('Cannot get a token for the user');
                });
            return deferred.promise;
        }


        $scope.init = function () {

            if (UserService.hasPerformances()) {
                //$scope.perfs = UserService.getPerformances();
            }
            else {
                if (!UserService.hasUserToken()) {
                    getToken().then(function (token) {
                        console.log(token);
                        UserService.setUserToken(token);
                    }, function (error) {
                        console.error(error)
                    });
                }

                // var token = UserService.getUserToken();

                // set Authorization token
                //Services.getUserToken(token.hash);
                Services.getPerformance().then(function (result) {
                        console.log(result);
                        // $scope.perfs = result; TODO
                        UserService.setPerformances(result);
                    },
                    // error handling
                    function () {
                        console.log("Erreur sur l'obtention des favoris !")
                    });
            }
        }

        $scope.perfs = Stations.getPerformance();
        console.log('$scope.perfs');
        console.log($scope.perfs);
        /*$scope.perfs =  [{
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
         ];*/


        if ($scope.perfs.length > 0) {

            var labels = [];
            var data = [];
            for (var i= 0; i<$scope.perfs.length ; i++){
                labels[i] = $filter('date')($scope.perfs[i].datePerf, 'MM/dd');
                data[i] = $scope.perfs[i].cost;
            }


            $scope.dataPerf = {
                "series": ["Performances"],
                "data": [data],
                "labels": labels,
                "colours": [{ // default
                    "fillColor": "rgba(224, 108, 112, 0.6)",
                    "strokeColor": "rgba(207,100,103,1)",
                    "pointColor": "rgba(220,220,220,1)",
                    "pointStrokeColor": "#fff",
                    "pointHighlightFill": "#fff",
                    "pointHighlightStroke": "rgba(151,187,205,0.8)"
                }]
            };
        }

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