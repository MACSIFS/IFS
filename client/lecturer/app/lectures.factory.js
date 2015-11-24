(function() {
    'use strict';
    
    angular
        .module('lecturer')
        .factory('lecturesFactory', lecturesFactory);

    /* @ngInject */
    function lecturesFactory(lecturesService) {
        var lectureId = 1;
        var service = {
            getEngagements: getEngagements,
            getComments: getComments
        };
        
        return service;
        
        function getEngagements(onSuccess) {
            lecturesService.getEngagements
                .query({lectureId: lectureId, last: true}, onSuccess, onError);

            function onError() {
                console.log('Error');
            }
        }

        function getComments(onSuccess, onFail) {
            lecturesService.retrieveComments
                .get({lectureId: lectureId}, onSuccess, onFail);
        }
    }
})();
