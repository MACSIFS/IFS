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
        var loggedIn = false;
        var lecturerId;

        var service = {
            login: login,
            checkUserToken: checkUserToken,
            logout: logout,
            registerObserverCallback: registerObserverCallback,
            isLoggedIn: isLoggedIn,
            getLecturerId: getLecturerId
        };

        return service;

        function login(credentials, onSuccess, onError) {
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

            Login.save(form,
                function(response) {
                    if (angular.isFunction(onSuccess)) {
                        onSuccess(response);
                    }
                    loginSuccess(response);
                }, function() {
                    if (angular.isFunction(onError)) {
                        onError();
                    }
                }
            );
        }

        function checkUserToken(onSuccess, onError) {
            if (!Login) {
                Login = lecturerService.login;
            }

            Login.get(function(response) {
                loginSuccess(response);
                if (angular.isFunction(onSuccess)) {
                    onSuccess();
                }
            }, function() {
                resetCallbacks();
                if (angular.isFunction(onError)) {
                    onError();
                }
            });
        }

        function logout() {
            lecturerService.logout
                .save(success, resetCallbacks);

            function success() {
                resetCallbacks();
                $location.path('/');
            }
        }

        function registerObserverCallback(callback) {
            observerCallbacks.push(callback);
        }

        function loginSuccess(response) {
            loggedIn = true;
            lecturerId = response.id;
            angular.forEach(observerCallbacks, function(callback) {
                callback(loggedIn, response.username);
            });
        }

        function resetCallbacks() {
            loggedIn = false;
            angular.forEach(observerCallbacks, function(callback) {
                callback(loggedIn);
            });
        }

        function isLoggedIn() {
            return loggedIn;
        }

        function getLecturerId() {
            return lecturerId;
        }
    }
})();
