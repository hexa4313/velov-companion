/**
 * Created by Modou on 05/05/2015.
 */
angular.module('vc').factory('APIInterceptor', function($rootScope, UserService) {

    return {

        request :function (config) {
        var currentToken = UserService.getUserToken();

        if (currentToken) {
            config.headers.authorization = "id : " + currentToken.hash;
        }
        return config;
    },

    response: function (response) {
        if (response.status === 401) {
            $rootScope.$broadcast('unauthorized');
        }
        return response;
    }
}
});