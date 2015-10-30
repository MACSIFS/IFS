(function() {
    'use strict';
    
    angular
        .module('student')
        .controller('JoinCtrl', JoinController);

    /* @ngInject */
    function JoinController(lectureFactory) {
        console.log('Ready (Join Controller)');
        angular.element('#join-btn').addClass('active');
        var vm = this;
        
        vm.lectureId = '';
        vm.joinLecture = joinLecture;
        
        function joinLecture() {
            if (vm.lectureId !== '') {
                console.log('joining');
                lectureFactory.joinLecture(vm.lectureId);
            }
        }
    }
})();