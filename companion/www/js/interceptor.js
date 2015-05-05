/**
 * Created by Modou on 05/05/2015.
 */
angular.module('vc').factory('APIInterceptor', function($rootScope, Services) {
    var service = this;

    return {

        request :function (config) {
        var currentToken = Services.getUserToken();
        var access_token = "id : " + currentToken.hash;

        if (currentToken) {
            config.headers.authorization = access_token;
        }
        return config;
    },

    responseError: function (response) {
        if (response.status === 401) {
            $rootScope.$broadcast('unauthorized');
        }
        return response;
    }
}
});