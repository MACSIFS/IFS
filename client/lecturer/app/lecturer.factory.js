(function() {
    'use strict';

    angular
        .module('lecturer')
        .factory('lecturerFactory', lecturerFactory);

    /* @ngInject */
    function lecturerFactory(lecturerService, $location) {
        var username = '';
        var observerCallbacks = [];
        var Login = false;
        
        var service = {
            login: login,
            checkUserToken: checkUserToken,
            logout: logout,
            registerObserverCallback: registerObserverCallback
        };

        return service;

        function login(credentials, showFeedback) {
            if (!Login) {
                Login = lecturerService.login;
            }

            var SHA256 = new Hashes.SHA256();
            SHA256.setUTF8(true);
            
            // Prevent binding the hashed password into the input.
            var form = {
                email: credentials.email,
                password: SHA256.hex(credentials.password)
            };
            
            Login.save(form, loginSuccess, function() {
                showFeedback();
                resetCallbacks();
            });
        }

        function checkUserToken(onError) {
            if (!Login) {
                Login = lectureService.login;
            }
            
            Login.get(loginSuccess, function() {
                resetCallbacks();
                onError();
            });
        }

        function logout() {
            lecturerService.logout
                .save(success);

            function success() {
                resetCallbacks();
                $location.path('/');
            }
        }
        
        function registerObserverCallback(callback) {
            observerCallbacks.push(callback);
        }
        
        function loginSuccess(response) {
            angular.forEach(observerCallbacks, function(callback) {
                callback(true, response.username);
            });
        }
        
        function resetCallbacks() {
            angular.forEach(observerCallbacks, function(callback) {
                callback(false);
            });
        }
    }
})();
