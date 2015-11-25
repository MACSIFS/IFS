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
        
        lecturesList.list = [
            {id: 1, name: 'Intro', courseId: 1},
            {id: 2, name: 'Chapter 2', courseId: 1},
            {id: 3, name: 'Chapter 13 page 700', courseId: 1},
            {id: 4, name: 'Outro', courseId: 1}
        ];

        function getLectures() {
            var course = coursesFactory.getCourse();

            lecturesFactory.getLectures(course.id, function(lectures) {
                lecturesList.lectures = lectures;
            });
        }
        
    }
})();