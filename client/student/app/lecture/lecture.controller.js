(function() {
    'use strict';
    
    angular
        .module('student')
        .controller('LectureCtrl', LectureController);

    /* @ngInject */
    function LectureController(lectureFactory, $location) {
        console.log('Ready (Lecture Controller)');
        
        var vm = this;
        vm.leave = leave;
        
        function leave() {
            lectureFactory.leaveLecture();
        }
    }
})();