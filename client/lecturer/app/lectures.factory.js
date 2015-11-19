(function() {
    'use strict';
    
    angular
        .module('lecturer')
        .factory('lecturesFactory', lecturesFactory);

    /* @ngInject */
    function lecturesFactory(lecturesService) {
        var lectureId = 1;
        var service = {
            getEngagements: getEngagements
        };
        
        return service;
        
        function getEngagements(onSuccess) {
            lecturesService.getEngagements
                .query({lectureId: lectureId, latest: true}, onSuccess, onError);

            function onError() {
                console.log('Error');
            }
        }
    }
})();