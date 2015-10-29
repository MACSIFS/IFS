(function() {
    'use strict';
    
    angular
        .module('lecturer')
        .config(config);

    /* ngInject */
    function config($routeProvider) {
        console.log('Ready (Route Provider');
        
        $routeProvider
            .when('/', {
                templateUrl: 'app/login/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'vm'
            })
            .when('/register', {
                templateUrl: 'app/register/register.html',
                controller: 'RegisterCtrl',
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
})();