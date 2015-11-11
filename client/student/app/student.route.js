(function() {
    'use strict';
    
    angular
        .module('student')
        .config(config);

    /* @ngInject */
    function config($routeProvider) {
        console.log('Ready (Route Provider)');
        
        $routeProvider
            .when('/', {
                templateUrl: 'app/join/join.html',
                controller: 'JoinCtrl',
                controllerAs: 'vm'
            })
            .when('/archive', {
                templateUrl: 'app/archive/archive.html',
                controller: 'ArchiveCtrl',
                controllerAs: 'vm'
            })
            .when('/about', {
                templateUrl: 'app/about/about.html',
                resolve: {
                    highlight: function() {
                        angular.element('#about-btn').addClass('active');
                    }
                }
            })
            .when('/lecture/:lectureId', {
                templateUrl: 'app/lecture/lecture.html',
                controller: 'LectureCtrl',
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
})();