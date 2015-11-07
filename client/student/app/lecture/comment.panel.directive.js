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
            controllerAs: 'vm',
            bindToController: true
        };
        
        return directive;
        
        function link(scope, element, attrs, vm) {
            console.log('Ready (Archive Link)');
        }
    }
    
    /* @ngInject */
    function CommentPanelController(lectureFactory) {
        console.log('Ready (Simple List Panel Controller)');
        
        getComments();
        
        var vm = this;
        vm.list = [];
        
        function getComments() {
            lectureFactory
                .getComments(function(response) {
                    console.log('Success');
                    vm.list = response.comments;
                    
                }, function(response) {
                    console.log('Error');
                });
        }
       
    }
})();