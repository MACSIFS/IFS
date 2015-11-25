(function() {
    'use strict';
    
    angular
        .module('lecturer')
        .directive('coursesList', coursesList);
        
    function coursesList() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/courses/courses.list.html',
            link: link,
            controller: CoursesListController,
            controllerAs: 'coursesList',
            bindToController: true
        };

        return directive;

        function link(scope, element, attrs, coursesList) {
            console.log('Ready (Courses List Link)');
        }
    }

    /* @ngInject */
    function CoursesListController($scope, $location, coursesFactory) {
        console.log('Ready (Courses List Controller)');
        getCourses();
        
        var coursesList = this;
        coursesList.courseNameInput = {
            style: '',
            reachedLimit: false
        };
        coursesList.course = {
            id: 0,
            name: ''
        };
        coursesList.addNewCourse = addNewCourse;
        coursesList.openCourse = openCourse;
        coursesList.courses = [];
        
        $scope.$watch('coursesList.course.name', function(newName, oldName) {                        
            if (newName.length > 50) {
                coursesList.courseNameInput.reachedLimit = true;
                coursesList.courseNameInput.style = 'has-error';
            } else {
                coursesList.courseNameInput.reachedLimit = false;
                coursesList.courseNameInput.style = '';
            }
            
        });
        
        function addNewCourse() {
            if (angular.isDefined(coursesList.course.name)) {
                coursesFactory.addCourse({name: coursesList.course.name}, onSuccess);
            }
            
            function onSuccess(course) {
                coursesList.courses.push({
                    id: course.id,
                    name: coursesList.course.name
                });
            }
        }
        
        function openCourse(course) {
            coursesFactory.setCourse(course);
            $location.path('/courses/' + course.id);
        }
        
        function getCourses() {
            coursesFactory.getCourses(function(courses) {
                coursesList.courses = courses;
            });
        }
    }
})();
