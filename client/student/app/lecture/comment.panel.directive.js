(function() {
    'use strict';
    
    angular
        .module('student')
        .directive('commentPanel', commentPanel);
    
    function commentPanel() {
        var directive = {
            restrict: 'E',
            scope: {
                list: '='
            },
            templateUrl: 'app/lecture/comment.panel.html',
            link: link,
            controller: CommentPanelController,
            controllerAs: 'commentPanel',
            bindToController: true
        };
        
        return directive;
        
        function link(scope, element, attrs, commentPanel) {
            console.log('Ready (Comment Panel Link)');
        }
    }
    
    /* @ngInject */
    function CommentPanelController() {
        console.log('Ready (Comment Panel Controller)');
        
        var commentPanel = this;       
    }
})();