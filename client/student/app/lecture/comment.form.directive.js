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
            controllerAs: 'vm',
            bindToController: true
        };
        
        return directive;
        
        function link(scope, element, attrs, vm) {
            console.log('Ready (Comment Form Link)');
        }
    }
    
    /* @ngInject */
    function CommentFormController(lectureFactory) {
        console.log('Ready (Comment Form Controller)');
        
        var vm = this;
        vm.submitComment = submitComment;
        
        function submitComment() {
            console.log('submit comment');
            lectureFactory.submitComment();
        }
        
    }    
})();