(function() {
    'use strict';

    angular
        .module('lecturer')
        .controller('LectureCtrl', LectureController);

    /* @ngInject */
    function LectureController(lecturesFactory, $routeParams) {
        console.log('Ready (Lecture Controller)');
        angular.element('#courses-btn').addClass('active');

        var vm = this;
        lecturesFactory.setLectureId($routeParams.lectureId);
    }
})();
