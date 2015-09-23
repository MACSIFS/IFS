(function() {
    'use strict';
    
    angular
        .module('app')
        .controller('TeacherCtrl', TeacherController);
        
    /* @ngInject */
    function TeacherController($scope) {
        console.log('Teacher Controller Online');
        
        var vm = this;
        
        vm.login = {
            email: '',
            password: '',
            rememberMe: 0
        };
        
        vm.register = {
            email: '',
            emailConfirm: '',
            password: '',
            passwordConfirm: '',
            recaptcha: ''
        };
        
        $scope.registerButton = function() {
            console.log('Register');
        };
    }
})();