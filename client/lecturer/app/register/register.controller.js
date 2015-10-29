(function() {
    'use strict';
    
    angular
        .module('lecturer')
        .controller('RegisterCtrl', RegisterController);
        
    /* @ngInject */
    function RegisterController($scope) {
        console.log('Ready (Register Controller)');
        angular.element('#register-btn').addClass('active');
        var vm = this;
    }
})();