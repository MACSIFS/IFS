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
            .when('/lectures', {
                templateUrl: 'app/lectures/lectures.html',
                controller: 'LecturesCtrl',
                controllerAs: 'vm',
                loginRequired: true
            })
            .when('/lectures/:lectureId', {
                templateUrl: 'app/lecture/lecture.html',
                controller: 'LectureCtrl',
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
})();
