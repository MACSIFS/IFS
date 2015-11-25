(function() {
    'use strict';
    
    angular
        .module('lecturer')
        .controller('CourseCtrl', CoursController);

    /* @ngInject */
    function CoursController() {
        console.log('Ready (Course Controller)');
        angular.element('#courses-btn').addClass('active');

        var vm = this;
    }
})();