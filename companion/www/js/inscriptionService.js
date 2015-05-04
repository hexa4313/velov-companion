angular.module('vc.inscriptionService', [])

.service('inscriptionService', function($q) {
    var user = null;

        function inscription(first_name,last_name,email,password,birthday,numAbonne,pin, http) {

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
         
                 user = {
                    "username": email,
                    "first_name": first_name,
                    "last_name" :last_name,
                    "birthday": birthday,
                    "password": password,
                    "id": "89101112",
                    "catSport": "sportif",
                    "numAbonne": numAbonne,
                    "codePin": pin
                  };
                 deferred.resolve('Welcome ' + first_name + '!');

            
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
            inscription: inscription
        }
})