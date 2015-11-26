(function() {
    'use strict';

    angular
        .module('lecturer')
        .directive('lecturesList', lecturesList);

    function lecturesList() {
        var directive = {
            restrict: 'E',
            scope: {
                list: '=',
            },
            templateUrl: 'app/lectures/lectures.list.html',
            link: link,
            controller: LecturesListController,
            controllerAs: 'lecturesList',
            bindToController: true
        };

        return directive;

        function link(scope, element, attrs, lecturesList) {
            console.log('Ready (Lectures List Link)');
        }
    }

    /* @ngInject */
    function LecturesListController(lecturesFactory, coursesFactory) {
        console.log('Ready (Lectures List Controller)');
        getLectures();

        var lecturesList = this;
        lecturesList.openLecture = openLecture;

        function getLectures() {
            var course = coursesFactory.getCourse();

            lecturesFactory.getLectures(course.id, function(lectures) {
                lecturesList.list = lectures;
            });
        }

        function openLecture(lectureId) {
            lecturesFactory.openLecture(lectureId);
        }
    }
})();
