(function() {
    'use strict';
    
    angular
        .module('entry')
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
            .when('/archive', {
                templateUrl: 'app/archive/overview.html',
                controller: 'ArchiveCtrl',
                controllerAs: 'vm'
            })
            .when('/teacher', {
                templateUrl: 'app/teacher/teacher.html',
                controller: 'TeacherCtrl',
                controllerAs: 'vm'
            })
            .when('/about', {
                templateUrl: 'app/about/about.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
})();