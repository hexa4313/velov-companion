angular.module('vc.loginService', [])


.service('LoginService', function($q) {
    var user = null;
        function isLogged(){
           return (user == null ? false : true);
        }
        function getUser() {
            return user;
        }

        function loginUser(name, pw, numAbonne, codePin, http) {

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
            
           
            
            if (name == 'jmonnoire@gmail.com' && pw == 'secret') {
                 user = {
                    "username": name,
                    "first_name": "justine",
                    "last_name" :"Monnoire",
                    "birthday": "26-09-1993",
                    "password": pw,
                    "id": "89101112",
                    "catSport": "sportif",
                    "numAbonne": numAbonne,
                    "codePin": codePin
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