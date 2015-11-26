(function() {
    'use strict';
    
    angular
        .module('student')
        .directive('commentForm', commentForm);
    
    function commentForm() {
        var directive = {
            restrict: 'E',
            scope: {
                list: '=',
                submitted: '='
            },
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
            commentForm.submitComment = submitComment;
            commentForm.maxLength = 500;
        
        function submitComment() {
            commentForm.submitted = true;
                        
            if(commentForm.comment.length > commentForm.maxLength){
                console.log('error');
                commentForm.feedbackMessage = 'Comment/question too long!';
                commentForm.feedbackType = 'alert-danger';
                commentForm.feedbackIcon = 'glyphicon-exclamation-sign';

            }else{
            
                lectureFactory.submitComment(commentForm.comment, function(response) {
                    console.log('Success');
                    commentForm.feedbackMessage = 'Comment submitted!';
                    commentForm.feedbackType = 'alert-success';
                    commentForm.feedbackIcon = 'glyphicon-ok-sign';
                    //clear comment input text
                    commentForm.comment = "";
                    
                    var comment = {
                        id: response.id,
                        content: commentForm.comment,
                        submissionTime: new Date()
                    };
                    
                    commentForm.list.push(comment);
                }, function() {
                    console.log('error');
                    commentForm.feedbackMessage = 'An error occured!';
                    commentForm.feedbackType = 'alert-danger';
                    commentForm.feedbackIcon = 'glyphicon-exclamation-sign';
                });
            
            }
            
        }
    }    
})();
    