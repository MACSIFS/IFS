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
    function CommentPanelController(lectureFactory) {
        console.log('Ready (Comment Panel Controller)');
       
        var commentPanel = this;  
        commentPanel.upVoteComment = upVoteComment;
        commentPanel.downVoteComment = downVoteComment;

        function upVoteComment(comment){
            console.log('+1');
            lectureFactory.upVoteComment(comment.id, 1, function(respone){
                console.log('Success');
                comment.rating = 1;

            }, function() {
                console.log('error');
            });
        } 

        function downVoteComment(comment){
            console.log('-1');
            lectureFactory.upVoteComment(comment.id, -1, function(respone){
                console.log('Success');
                comment.rating = -1;

            }, function() {
                console.log('error');
            });
        }     
    }
})();