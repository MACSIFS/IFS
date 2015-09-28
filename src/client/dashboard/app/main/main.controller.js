(function() {
    'use strict';
    
    angular
        .module('dashboard')
        .controller('MainCtrl', MainController);

    /* @ngInject */
    function MainController($scope) {
        console.log('Main Controller online');
        var vm = this;
    }
})();