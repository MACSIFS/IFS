(function() {
    'use strict';
    
    angular
        .module('student')
        .factory('lectureFactory', lectureFactory);

    /* @ngInject */
    function lectureFactory(lectureService, $location, $routeParams) {
        console.log('Ready (Lecture Factory)');
        var lectureId = $routeParams.lectureId;
        var lecture = {};
    
        var service = {
            submitComment: submitComment,
            joinLecture: joinLecture,
            leaveLecture: leaveLecture,
            getComments: getComments
        };
        
        return service;
        
        function joinLecture(id, error) {
            lectureId = id;
            lectureService.retrieveLecture
                .get({lectureId: lectureId}, onSuccess, onFail);
            
            function onSuccess(response) {
                console.log('Success');
                lecture = response;
                $location.path('/lecture/' + lectureId);
            }
            
            function onFail(response) {
                
                // Show user feedback.
                if (angular.isFunction(error)) {
                    error();
                }
                
                // When manually typing the route with an id,
                // Redirect user to default route.
                //$location.path('/');
                $location.path('/');
            }
        }
        
        function leaveLecture() {
            lectureId = undefined;
            lecture = {};
            $location.path('/');
        }
        
        function submitComment(comment, onSuccess, onError) {
            if (angular.isDefined(lectureId)) {
                lectureService.submitComment
                    .save({lectureId: lectureId}, {data: comment}, onSuccess, onError);
            }
        }
        
        function getComments(onSuccess, onFail) {
            lectureService.retrieveComments
                .get({lectureId: lectureId}, onSuccess, onFail);
            
        }
    }
})();