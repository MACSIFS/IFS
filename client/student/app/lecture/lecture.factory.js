(function() {
    'use strict';
    
    angular
        .module('student')
        .factory('lectureFactory', lectureFactory);

    /* @ngInject */
    function lectureFactory(lectureService, $location) {
        console.log('Ready (Lecture Factory)');
        var lectureId;
    
        var service = {
            submitComment: submitComment,
            joinLecture: joinLecture,
            leaveLecture: leaveLecture,
            loadLecture: loadLecture,
            getComments: getComments
        };
        
        return service;
        
        function joinLecture(id) {
            lectureId = id;
            $location.path('/lecture');
        }
        
        function leaveLecture() {
            lectureId = undefined;
            $location.path('/');
        }
        
        function loadLecture() {
            if (lectureId !== undefined) {
                lectureService.retrieveSlides
                    .get({id: lectureId}, onSuccess, onFail);
            } else {
                $location.path('/');
            }
            
            function onSuccess(value, responseHeaders) {
                console.log('success', value);
            }
            
            function onFail(httpResponse) {
                console.log('error: ', httpResponse.status, httpResponse.statusText);
            }
        }
        
        function submitComment() {
            
            function onSuccess(value, responseHeaders) {
                console.log('Success', value);
            }
            
            function onFail(httpResponse) {
                console.log('Error');
            }
        }
        
        function getComments(onSuccess, onFail) {
            if (angular.isDefined(lectureId)) {
                lectureService.retrieveComments
                    .get({id: lectureId}, onSuccess, onFail);
            }
        }
    }
})();