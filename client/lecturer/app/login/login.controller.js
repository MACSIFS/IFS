(function() {
    'use strict';
    
    angular
        .module('lecturer')
        .controller('LoginCtrl', LoginController);

    /* @ngInject */
    function LoginController(lecturerFactory, $location) {
        console.log('Ready (Login Controller)');
        angular.element('#login-btn').addClass('active');

        if (lecturerFactory.isLoggedIn()) {
            $location.path('/courses');
        }

        var vm = this;
        vm.loginAttempt = false;
        vm.form = {};
        vm.loginUser = loginUser;

        function loginUser() {
            lecturerFactory.login(vm.form,
                function() {
                    $location.path('/courses');
                },
                function() {
                    vm.loginAttempt = true;
                    vm.feedbackMessage = 'Wrong user credentials';
                    vm.feedbackType = 'alert-danger';
                    vm.feedbackIcon = 'glyphicon-exclamation-sign';
                }
            );
        }
    }
})();
