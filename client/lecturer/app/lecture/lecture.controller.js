(function() {
    'use strict';

    angular
        .module('lecturer')
        .controller('LectureCtrl', LectureController);

    /* @ngInject */
    function LectureController(lecturesFactory, $routeParams) {
        console.log('Ready (Lecture Controller)');

        var vm = this;

        lecturesFactory.openLecture($routeParams.lectureId);
    }
})();
