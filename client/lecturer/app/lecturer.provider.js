(function() {
    'use strict';
    
    angular
        .module('lecturer')
        .config(config);

    /* ngInject */
    function config($routeProvider, $httpProvider) {
        console.log('Ready (Providers)');
        
        $routeProvider
            .when('/', {
                templateUrl: 'app/login/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'vm',
                loginRequired: false
            })
            .when('/register', {
                templateUrl: 'app/register/register.html',
                controller: 'RegisterCtrl',
                controllerAs: 'vm',
                loginRequired: false
            })
            .when('/courses', {
                templateUrl: 'app/courses/courses.html',
                controller: 'CoursesCtrl',
                controllerAs: 'vm',
                loginRequired: true
            })
            .when('/courses/:courseId', {
                templateUrl: 'app/lectures/lectures.html',
                controller: 'LecturesCtrl',
                controllerAs: 'vm',
                loginRequired: true
            })
            .when('/courses/:courseId/lectures', {
                templateUrl: 'app/lectures/lectures.html',
                controller: 'LecturesCtrl',
                controllerAs: 'vm',
                loginRequired: true
            })
            .when('/courses/:courseId/lectures/:lectureId', {
                templateUrl: 'app/lecture/lecture.html',
                controller: 'LectureCtrl',
                controllerAs: 'vm',
                loginRequired: true
            })
            .otherwise({
                redirectTo: '/'
            });

        $httpProvider.interceptors.push('apiInterceptor');
    }
})();
