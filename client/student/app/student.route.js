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
                controllerAs: 'vm',
                resolve: { /* @ngInject */
                    loadLecture: function(lectureFactory) {
                        
                        // NOTE(Thomas): Get lecture on 'resolve'
                        // ensures it being called on page refresh.
                        // Although, the lectureId needs to be locally stored.
                        lectureFactory.joinLecture();
                    }
                }
            })
            .otherwise({
                redirectTo: '/'
            });
    }
})();