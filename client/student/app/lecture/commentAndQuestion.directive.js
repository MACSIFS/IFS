(function() {
    'use strict';
    
    angular
        .module('student')
        .directive('commentAndQuestionPanel', commentAndQuestionPanel);
    
    function commentAndQuestionPanel() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/lecture/commentAndQuestion.html',
            link: link,
            controller: CommentAndQuestionPanelController,
            controllerAs: 'vm',
            bindToController: true
        };
        
        return directive;
        
        function link(scope, element, attrs, vm) {
            console.log('Ready (Archive Link)');
        }
    }
    
    /* @ngInject */
    function CommentAndQuestionPanelController(lectureFactory) {
        console.log('Ready (Simple List Panel Controller)');
        
        getCommentsAndQuestions();
        
        var vm = this;
        vm.list = [
            {text: 'This is a comment'},
            {text: 'Is this a question?'},
            {text: 'Could you repeat this lecture?'},
            {text: 'This is a really long comment. A comment testing how the text wraps to multiple lines'}
        ];
        
        function getCommentsAndQuestions() {
            lectureFactory
                .getCommentsAndQuestions(function(response) {
                    console.log('Success');
                    // TODO: update vm.list.
                    
                }, function(response) {
                    console.log('Error');
                });
        }
       
    }
})();