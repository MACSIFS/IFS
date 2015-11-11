(function() {
    'use strict';
    
    angular
        .module('student')
        .factory('lectureFactory', lectureFactory);

    /* @ngInject */
    function lectureFactory(lectureService, $location) {
        console.log('Ready (Lecture Factory)');
        var lectureId;
        
        // NOTE: This object needs to be stored locally 
        // in order to load a joined lecture on page refresh.
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
                $location.path('/lecture/' + id);
            }
            
            function onFail(response) {
                console.log('Error: ', response.message);
                
                // Show user feedback.
                if (angular.isFunction(error)) {
                    error();
                }
                
                // When manually typing the route with an id,
                // Redirect user to default route.
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
            if (angular.isDefined(lectureId)) {
                lectureService.retrieveComments
                    .get({lectureId: lectureId}, onSuccess, onFail);
            }
        }
    }
})();