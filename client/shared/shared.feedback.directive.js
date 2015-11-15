(function() {
    'use strict';
    
    angular
        .module('ifsShared')
        .directive('ifsFeedback', ifsFeedback);
    
    function ifsFeedback() {
        var directive = {
            restrict: 'E',
            scope: {
                message: '=',
                type: '=',
                icon: '='
            },
            templateUrl: '../shared/shared.feedback.html',
            controller: IfsFeedbackController,
            controllerAs: 'ifsFeedback',
            bindToController: true
        };
        
        return directive;
    }
    
    /* @ngInject */
    function IfsFeedbackController() {
        console.log('Ready (Ifs Feedback Controller)');
    }
})();