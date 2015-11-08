(function() {
    'use strict';
    
    angular
        .module('student')
        .directive('commentForm', commentForm);
    
    function commentForm() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/lecture/comment.form.html',
            link: link,
            controller: CommentFormController,
            controllerAs: 'commentForm',
            bindToController: true
        };
        
        return directive;
        
        function link(scope, element, attrs, commentForm) {
            console.log('Ready (Comment Form Link)');
        }
    }
    
    /* @ngInject */
    function CommentFormController(lectureFactory) {
        console.log('Ready (Comment Form Controller)');
        
        var commentForm = this;
        commentForm.comment = '';
        commentForm.submitComment = submitComment;
        
        function submitComment() {
            lectureFactory.submitComment(commentForm.comment, function() {
                console.log('Success');
                // TODO: Show user feedback.
            }, function() {
                console.log('error');
                // TODO: Show user feedback.
            });
        }
    }    
})();