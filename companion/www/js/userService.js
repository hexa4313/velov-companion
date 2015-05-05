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
        }
    };

});