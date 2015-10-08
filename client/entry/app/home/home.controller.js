(function() {
    'use strict';
    
    angular
        .module('entry')
        .controller('HomeCtrl', HomeController);

    /* @ngInject */
    function HomeController(lectureFactory) {
        console.log('Home Controller online');
        
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