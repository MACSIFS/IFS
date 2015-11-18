(function() {
    'use strict';
    
    angular
        .module('lecturer')
        .factory('userFactory', userFactory);

    function userFactory() {
        var loggedIn = false;
        var observerCallbacks = [];
        
        var service = {
            login: login,
            logout: logout,
            isLoggedIn: isLoggedIn,
            registerObserverCallback: registerObserverCallback
        };
        
        return service;
        
        function logout() {
            loggedIn = false;
            angular
                .forEach(observerCallbacks, function(callback) {
                    callback(loggedIn);
                });
        }
        
        function login() {
            loggedIn = true;
            angular
                .forEach(observerCallbacks, function(callback) {
                    callback(loggedIn);
                });
        }
        
        function isLoggedIn() {
            return loggedIn;
        }
        
        function registerObserverCallback(callback) {
            observerCallbacks.push(callback);
        }
    }
})();