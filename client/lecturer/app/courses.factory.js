(function() {
    'use strict';
    
    angular
        .module('lecturer')
        .factory('coursesFactory', coursesFactory);

    /* @ngInject */
    function coursesFactory(coursesService) {
        var selectedCourse = {};
        
        var Course = false;
        var service = {
            getCourses: getCourses,
            addCourse: addCourse,
            setCourse: setCourse,
            getCourse: getCourse
        };
        
        return service;
        
        function getCourses(onSuccess) {
            if (!Course) {
                Course = coursesService.course;
            }
            
            Course.query({lecturer: 1}, onSuccess);
        }
        
        function addCourse(course, onSuccess) {
            if (!Course) {
                Course = coursesService.course;
            }
            Course.save(course, onSuccess);
        }
        
        function setCourse(course) {
            selectedCourse = course;
        }
        
        function getCourse() {
            return selectedCourse;
        }
    }
})();