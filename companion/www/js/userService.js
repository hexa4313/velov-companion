/**
 * Created by Modou on 04/05/2015.
 */

angular.module('vc').factory('UserService', function ($localStorage) {

    return {
        setUser: function (user) {

            $localStorage['user'] = user;
        },
        getUser: function () {
            return $localStorage['user'];
        },
        isLogged: function(){
            return ($localStorage['user'] == null ? false : true);
        },
        logout: function(){
            $localStorage['user'] = null;
        },
        setUserToken: function (token) {

            $localStorage['token'] = token;
        },
        getUserToken: function () {
            return $localStorage['token'];
        },
        hasUserToken: function () {
            return ($localStorage['token']? true : false);
        },
        setPerformances: function (stations) {
            $localStorage['performance'] = stations;
        },
        getPerformances: function () {
            return $localStorage['performance'];
        },
        hasPerformances: function () {
            return ($localStorage['performance']? true : false);
        }

    };

});