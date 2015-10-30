(function() {
    'use strict';
    
    angular
        .module('lecturer')
        .controller('LecturerCtrl', LecturerController);
    
    /* @ngInject */
    function LecturerController($scope) {
        console.log('Ready (Lecturer Controller)');
        
        var vm = this;
    }
})();