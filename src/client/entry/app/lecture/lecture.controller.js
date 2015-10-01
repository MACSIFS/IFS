(function() {
    'use strict';
    
    angular
        .module('entry')
        .controller('LectureCtrl', LectureController);

    /* @ngInject */
    function LectureController(lectureFactory, $location) {
        console.log('Lecture Controller online');
        
        var vm = this;
        vm.leave = leave;
        
        function leave() {
            lectureFactory.leaveLecture();
        }
    }
})();