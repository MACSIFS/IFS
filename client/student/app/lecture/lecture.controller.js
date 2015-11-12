(function() {
    'use strict';
    
    angular
        .module('student')
        .controller('LectureCtrl', LectureController);

    /* @ngInject */
    function LectureController(lectureFactory) {
        console.log('Ready (Lecture Controller)');
        angular.element('#engagement-btn').addClass('active');
        
        lectureFactory.setShowComment(showComments);
        lectureFactory.setShowEngagement(showEngagement);
        lectureFactory.joinLecture();
        getComments();
        
        var vm = this;
        vm.comment = '';
        vm.comments = [];
        vm.submitted = false;
        vm.showEngagement = true;
        vm.showComments = false;
        
        function getComments() {
            lectureFactory
                .getComments(function(response) {
                    console.log('Success');
                    vm.comments = response.comments;
                    
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
    }
})();
