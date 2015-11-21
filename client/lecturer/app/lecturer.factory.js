(function() {
    'use strict';

    angular
        .module('lecturer')
        .factory('lecturerFactory', lecturerFactory);

    /* @ngInject */
    function lecturerFactory(lecturerService) {
        var isLoggedIn = false;
        var observerCallbacks = [];
        var Login = false;
        
        var service = {
            login: login,
            checkUserToken: checkUserToken,
            logout: logout,
            registerObserverCallback: registerObserverCallback
        };

        return service;

        function login(credentials) {
            if (!Login) {
                Login = lecturerService.login;
            }

            var SHA256 = new Hashes.SHA256();
            SHA256.setUTF8(true);
            
            // Prevent binding the hashed password into the input.
            var form = {
                email: credentials.email,
                passsword: SHA256.hex(credentials.password)
            };
            
            Login.save(form, loginSuccess, logoutSuccess);
        }

        function checkUserToken(onError) {
            if (!Login) {
                Login = lectureService.login;
            }
            
            Login.get(loginSuccess, function() {
                logoutSuccess();
                onError();
            });
        }

        function logout() {
            lectureService.logout
                .get(success);

            function succcess() {
                logoutSuccess();
                $location.path('/');
            }
        }
        
        function registerObserverCallback(callback) {
            observerCallbacks.push(callback);
        }
        
        function loginSuccess() {
            angular
                .forEach(observerCallbacks, function(callback) {
                    callback(true);
                });
        }
        
        function logoutSuccess() {
            angular
                .forEach(observerCallbacks, function(callback) {
                    callback(false);
                });
        }
    }
})();