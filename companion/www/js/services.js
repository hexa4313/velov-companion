/**
 * Created by Modou on 30/04/2015.
 */

angular.module('vc').factory('Services', function ($http) {

    return {
        discover: function (currentPosition) {
            // $http returns a promise, which has a then function, which also returns a promise
            return $http.get('url??').then(function (response) {
                return response.data; // Json Struct ?
            });
        }
    };
});