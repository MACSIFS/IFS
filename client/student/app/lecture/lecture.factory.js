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
        var observerCallbacks = [];
        var showCommentFn = false;
        var showEngagementFn = false;
    
        var service = {
            submitComment: submitComment,
            joinLecture: joinLecture,
            getComments: getComments,
            getLecture: getLecture,
            registerObserverCallback: registerObserverCallback,
            setShowComment: setShowComment,
            setShowEngagement: setShowEngagement,
            linkShowComment: linkShowComment,
            linkShowEngagement: linkShowEngagement
        };
        
        return service;
        
        function joinLecture(id, error) {
            if (angular.isDefined(id)) {
                lectureId = id;
            }

            lectureService.retrieveLecture
                .get({lectureId: lectureId}, onSuccess, onFail);
            
            function onSuccess(response) {
                console.log('Success');
                lecture = response;
                
                angular.forEach(observerCallbacks, function(callback) {
                    callback(lecture);
                });
                
                $location.path('/lecture/' + lectureId);
            }
            
            function onFail(response) {
                
                lecture = {
                    id: 1,
                    name: 'Lecture1',
                    courseId: 1
                };
                
                angular.forEach(observerCallbacks, function(callback) {
                    callback(lecture);
                });
                
                $location.path('/lecture/' + lectureId);
                
                /*
                console.log('Error');

                // Show user feedback.
                if (angular.isFunction(error)) {
                    error();
                }

                // When manually typing the route with an id,
                // Redirect user to default route.
                $location.path('/');
                */
            }
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
        
        function getLecture() {
            return (angular.isDefined(lecture.id))? lecture: false;
        }
        
        function registerObserverCallback(callback) {
            observerCallbacks.push(callback);
        }
        
        function setShowComment(func) {
            showCommentFn = func;
        }
        
        function setShowEngagement(func) {
            showEngagementFn = func;
        }
        
        function linkShowComment() {
            angular.element('#engagement-btn').removeClass('active');
            angular.element('#comment-btn').addClass('active');
            showCommentFn();
        }
        
        function linkShowEngagement() {
            angular.element('#comment-btn').removeClass('active');
            angular.element('#engagement-btn').addClass('active');
            showEngagementFn();
        }
    }
})();
