(function() {
    'use strict';
    
    angular
        .module('lecturer')
        .controller('CoursesCtrl', CourseController);

    /* @ngInject */
    function CourseController() {
        console.log('Ready (Course Controller)');
        angular.element('#courses-btn').addClass('active');
        
        var vm = this;
    }
})();