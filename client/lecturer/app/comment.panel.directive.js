(function() {
    'use strict';

    angular
        .module('lecturer')
        .directive('commentPanel', commentPanel);

    function commentPanel() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/comment.panel.html',
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
    function CommentPanelController(lecturesFactory, $interval, $scope) {
        console.log('Ready (Comment Panel Controller)');

        var commentPanel = this;
        commentPanel.comments = [];

        var pollPromise;

        $scope.$on('$destroy', function(){
            if (pollPromise) {
                $interval.cancel(pollPromise);
            }
        });

        getComments();
        pollPromise = $interval(function() {
            getComments();
        }, 4000);

        function getComments() {
            lecturesFactory
                .getComments(function(response) {
                    commentPanel.comments = response.comments.map(function(comment) {
                        return {
                            id: comment.id,
                            content: comment.content,
                            score: comment.score, 
                            submissionTime: new Date(comment.submissionTime)
                        };
                    });

                }, function(response) {
                    console.log('Error');
                });
        }
    }
})();
