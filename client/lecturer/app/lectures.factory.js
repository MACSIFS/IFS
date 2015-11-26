(function() {
    'use strict';

    angular
        .module('lecturer')
        .factory('lecturesFactory', lecturesFactory);

    /* @ngInject */
    function lecturesFactory(lecturesService, $location) {
        var lecture = {};

        var service = {
            getEngagements: getEngagements,
            getComments: getComments,
            openLecture: openLecture,
            getLectures: getLectures,
            addLecture: addLecture,
            setLectureId: setLectureId
        };

        return service;

        function getEngagements(onSuccess) {
            lecturesService.getEngagements
                .query({lectureId: lecture.id, last: true}, onSuccess, onError);

            function onError() {
                console.log('Error');
            }
        }

        function getComments(onSuccess, onFail) {
            lecturesService.retrieveComments
                .get({lectureId: lecture.id}, onSuccess, onFail);
        }

        function setLectureId(id) {
            lecture.id = id;
        }

        function openLecture(lecture) {
            lecture = lecture;
            $location.path('courses/' + lecture.courseId + '/lectures/' + lecture.id);
        }
        
        function getLectures(courseId, onSuccess) {
            
            lecturesService.lectures
                .query({course: courseId}, onSuccess, error);
            
            function error() {
                console.log('error');
            }
        }
        
        function addLecture(lecture, onSuccess) {
            lecturesService.lectures
                .save(lecture, onSuccess, onSuccess);
            
            function error() {
                console.log('error');
            }
        }
    }
})();
