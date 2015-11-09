(function() {
    'use strict';
    
    angular
        .module('student')
        .controller('LectureCtrl', LectureController);

    /* @ngInject */
    function LectureController(lectureFactory) {
        console.log('Ready (Lecture Controller)');
        getComments();
        
        var vm = this;
        vm.comment = '';
        vm.comments = [];
        vm.submitted = false;
        vm.leave = leave;
        
        function leave() {
            lectureFactory.leaveLecture();
        }
        
        function getComments() {
            lectureFactory
                .getComments(function(response) {
                    console.log('Success');
                    vm.comments = response.comments;
                    
                }, function(response) {
                    console.log('Error');
                });
        }
    }
})();