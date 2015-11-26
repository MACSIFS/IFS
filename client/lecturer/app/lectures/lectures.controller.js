(function() {
    'use strict';
    
    angular
        .module('lecturer')
        .controller('LecturesCtrl', LecturesController);

    /* @ngInject */
    function LecturesController(lecturesFactory, coursesFactory) {
        console.log('Ready (Lectures Controller)');
        angular.element('#courses-btn').addClass('active');
        
        var vm = this;
        vm.lectures = [];
        vm.newLecture = {
            name: ''
        };
        
        vm.saveNewLecture = saveNewLecture;
        
        function saveNewLecture() {
            var course = coursesFactory.getCourse();

            if (vm.newLecture.name.length > 0 && vm.newLecture.name.length <= 50) {
                vm.newLecture.courseId = course.id;
                lecturesFactory.addLecture(vm.newLecture, success);
            }

            function success(response) {
                var lecture = {
                    id: response.id,
                    name: vm.newLecture.name,
                    courseId: course.id
                };

                vm.lectures.push(lecture);
                vm.newLecture.name = '';
                $('#lecture-dialog').modal('toggle');
            }
        }
    }
})();