(function() {
    'use strict';
    
    angular
        .module('dashboard')
        .controller('RegisterCtrl', RegisterController);
        
    /* @ngInject */
    function RegisterController($scope) {
        console.log('Register Controller online');
    }
})();