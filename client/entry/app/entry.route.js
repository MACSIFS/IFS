(function() {
    'use strict';
    
    angular
        .module('entry')
        .config(config);

    /* @ngInject */
    function config($routeProvider) {
        console.log('Route Provider live');
        
        $routeProvider
            .when('/', {
                templateUrl: 'app/home/home.html',
                controller: 'HomeCtrl',
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