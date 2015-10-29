(function() {
    'use strict';
    
    angular
        .module('lecturer')
        .controller('LoginCtrl', LoginController);

    /* @ngInject */
    function LoginController($scope) {
        console.log('Ready (Login Controller)');
        angular.element('#login-btn').addClass('active');
        var vm = this;
    }
})();