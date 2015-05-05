angular.module('vc.loginService', [])


.service('LoginService', function($q,UserService) {
    var user = null;

        function loginUser(name, pw, numAbonne, codePin) {

            //user = "apres";

            var deferred = $q.defer();
            var promise = deferred.promise;



            //$http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
            if (name != null && pw != null) {
                 user = {
                    "username": name,
                    "first_name": "justine",
                    "last_name" :"Monnoire",
                    "birthday": "26-09-1993",
                    "password": pw,
                    "id": "89101112",
                    "catSport": "sportif",
                    "numAbonne": "numAbonne",
                    "codePin": "codePin"
                  };
                  UserService.setUser(user);
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
            loginUser: loginUser
        }
})