(function() {
    'use strict';
    
    angular
        .module('lecturer')
        .controller('LoginCtrl', LoginController);

    /* @ngInject */
    function LoginController(lecturerFactory) {
        console.log('Ready (Login Controller)');
        angular.element('#login-btn').addClass('active');
        
        var vm = this;
        vm.form = {};
        vm.loginUser = loginUser;
        
        function loginUser() {
            lecturerFactory.login(vm.form);
        }
    }
})();