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
            .when('/lecture', {
                templateUrl: 'app/lecture/lecture.html',
                controller: 'LectureCtrl',
                controllerAs: 'vm',
                resolve: { /* @ngInject */
                    loadLecture: function(lectureFactory) {
                        
                        // NOTE(Thomas): Loading the lecture on 'resolve'
                        // ensures it being loaded on page refresh,
                        // although data needs to be stored locally to
                        // prevent users (students) being re-directed to home.
                        lectureFactory.loadLecture();
                    }
                }
            })
            .otherwise({
                redirectTo: '/'
            });
    }
})();