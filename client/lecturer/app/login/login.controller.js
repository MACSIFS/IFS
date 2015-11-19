(function() {
    'use strict';
    
    angular
        .module('lecturer')
        .controller('LoginCtrl', LoginController);

    /* @ngInject */
    function LoginController(userFactory) {
        console.log('Ready (Login Controller)');
        angular.element('#login-btn').addClass('active');
        var vm = this;
        
        vm.loginUser = loginUser;
        
        function loginUser() {
            userFactory.login();
        }
    }
})();