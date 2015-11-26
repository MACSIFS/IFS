(function() {
    'use strict';

    angular
        .module('lecturer')
        .controller('CoursesCtrl', CoursesController);

    /* @ngInject */
    function CoursesController() {
        console.log('Ready (Courses Controller)');
        angular.element('#courses-btn').addClass('active');

        var vm = this;
    }
})();
