(function() {
    'use strict';
    
    angular
        .module('dashboard')
        .config(config);

    /* ngInject */
    function config($routeProvider) {
        console.log('Route Provider live');
        
        $routeProvider
            .when('/', {
                templateUrl: 'app/main/main.html',
                controller: 'MainCtrl',
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