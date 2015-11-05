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
            joinLecture: joinLecture,
            leaveLecture: leaveLecture,
            loadLecture: loadLecture,
            getCommentsAndQuestions: getCommentsAndQuestions
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
                console.log('Success', value);
            }
            
            function onFail(httpResponse) {
                console.log('Error');
            }
        }
        
        function getCommentsAndQuestions(onSuccess, onFail) {
            if (angular.isDefined(lectureId)) {
                lectureService.retrieveCommentsAndQuestions
                    .get({id: lectureId}, onSuccess, onFail);
            } else {
                $location.path('/');
            }
        }
    }
})();