angular.module('vc.loginService', [])


.service('LoginService', function($q) {
    var user = null;
        function isLogged(){
           return (user == null ? false : true);
        }
        function getUser() {
            return user;
        }

        function loginUser(name, pw, http) {

            //user = "apres";

            /*http.get('http://rest-service.guides.spring.io/greeting').
            success(function(data) {
                var alertPopup = ionicpopup.alert({
                    title: 'Login failed!',
                    template: data.content
                });
            });*/
            var deferred = $q.defer();
            var promise = deferred.promise;
            
           
            
            if (name == 'user' && pw == 'secret') {
                 user = {
                    "username": name,
                    "password": pw,
                    "id": "89101112"
                  };
                 deferred.resolve('Welcome ' + name + '!');

            } else {
                deferred.reject('Wrong credentials.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }

        return{
            isLogged: isLogged,
            getUser: getUser,
            loginUser: loginUser
        }
})