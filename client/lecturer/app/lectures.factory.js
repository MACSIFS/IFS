(function() {
    'use strict';

    angular
        .module('lecturer')
        .factory('lecturesFactory', lecturesFactory);

    /* @ngInject */
    function lecturesFactory(lecturesService, $location) {
        var lectureId;
        var lecture = {};

        var service = {
            getEngagements: getEngagements,
            getComments: getComments,
            openLecture: openLecture,
            getLectures: getLectures,
            addLecture: addLecture
        };

        return service;

        function getEngagements(onSuccess) {
            lecturesService.getEngagements
                .query({lectureId: lectureId, last: true}, onSuccess, onError);

            function onError() {
                console.log('Error');
            }
        }

        function getComments(onSuccess, onFail) {
            lecturesService.retrieveComments
                .get({lectureId: lectureId}, onSuccess, onFail);
        }

        function setLecture(id) {
            lectureId = id;
        }

        function openLecture(id, error) {
            lectureId = id;

            lecturesService.retrieveLecture
                .get({lectureId: lectureId}, onSuccess, onFail);

            function onSuccess(response) {
                lecture = response;

                $location.path('/lectures/' + lectureId);
            }

            function onFail(response) {
                // Show user feedback.
                if (angular.isFunction(error)) {
                    error();
                }

                $location.path('/lectures');
            }
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
