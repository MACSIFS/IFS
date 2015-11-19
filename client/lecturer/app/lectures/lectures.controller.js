(function() {
    'use strict';
    
    angular
        .module('lecturer')
        .controller('LecturesCtrl', LecturesController);

    /* @ngInject */
    function LecturesController() {
        console.log('Ready (Lectures Controller)');
        angular.element('#lectures-btn').addClass('active');
        
        var vm = this;
    }
})();