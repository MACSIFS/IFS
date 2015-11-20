(function() {
    'use strict';
    
    angular
        .module('student')
        .controller('LectureCtrl', LectureController);

    /* @ngInject */
    function LectureController($scope, $interval, $routeParams, lectureFactory) {
        console.log('Ready (Lecture Controller)');
        angular.element('#engagement-btn').addClass('active');
        
        lectureFactory.setShowComment(showComments);
        lectureFactory.setShowEngagement(showEngagement);
        lectureFactory.joinLecture($routeParams.lectureId);
        getComments();
        
        var vm = this;
        vm.comment = '';
        vm.comments = [];
        vm.submitted = false;
        vm.showEngagement = true;
        vm.showComments = false;
        
        vm.lastPosition = {
            x: -100, 
            y: -100,
            t: null
        };       
        
        vm.currentPosition = {
            x: -100, 
            y: -100,
            t: null
        };
        
        function getComments() {
            lectureFactory
                .getComments(function(response) {
                    console.log('Success');
                    vm.comments = response.comments.map(function(comment) {
                        return {
                            id: comment.id,
                            content: comment.content,
                            submissionTime: new Date(comment.submissionTime)
                        };
                    });
                    
                }, function(response) {
                    console.log('Error');
                });
        }
        
        function showComments() {
            vm.showComments = true;
            vm.showEngagement = false;
        }
        
        function showEngagement() {
            vm.showComments = false;
            vm.showEngagement = true;
        }
        
        $interval(function() {
            if (vm.currentPosition.x != vm.lastPosition.x || vm.currentPosition.y != vm.lastPosition.y) {
                
                vm.lastPosition = {
                    x: vm.currentPosition.x,
                    y: vm.currentPosition.y,
                    t: vm.currentPosition.t
                };    
                
                var postData = {
                    challenge: ((vm.currentPosition.x - 30)/240).toFixed(2),
                    interest: ((240 - (vm.currentPosition.y - 30))/240).toFixed(2),
                    time: (new Date(vm.currentPosition.t)).toISOString()
                };
                
                lectureFactory.submitEngagement(
                    postData,
                    function() {
                        console.log('Success');
                    },
                    function() {
                        console.log('Error');
                    }
                );
            }
        }, 2000);
        
    }
})();
