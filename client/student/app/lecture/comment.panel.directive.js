(function() {
    'use strict';
    
    angular
        .module('student')
        .directive('commentPanel', commentPanel);
    
    function commentPanel() {
        var directive = {
            restrict: 'E',
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
    function CommentPanelController(lectureFactory) {
        console.log('Ready (Comment Panel Controller)');
        
        getComments();
        
        var commentPanel = this;
        commentPanel.list = [];
        
        function getComments() {
            lectureFactory
                .getComments(function(response) {
                    console.log('Success');
                    commentPanel.list = response.comments;
                    
                }, function(response) {
                    console.log('Error');
                });
        }
       
    }
})();