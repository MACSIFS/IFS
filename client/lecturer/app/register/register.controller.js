(function() {
    'use strict';
    
    angular
        .module('lecturer')
        .controller('RegisterCtrl', RegisterController);
        
    /* @ngInject */
    function RegisterController(lecturerFactory, $location) {
        console.log('Ready (Register Controller)');
        angular.element('#register-btn').addClass('active');

        if (lecturerFactory.isLoggedIn()) {
            $location.path('/courses');
        }

        var vm = this;
    }
})();
