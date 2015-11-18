(function() {
    'use strict';
    
    angular
        .module('student')
        .controller('StudentCtrl', StudentController);
    
    /* @ngInject */
    function StudentController(lectureFactory) {
        console.log('Ready (Student Controller)');
        
        var vm = this;
    }
})();