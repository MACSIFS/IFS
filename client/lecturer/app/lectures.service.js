(function() {
    'use strict';

    angular
        .module('lecturer')
        .service('lecturesService', lecturesService);

    /* @ngInject */
    function lecturesService($resource, CONSTANT) {
        console.log('Ready (Lectures Service)');
        
        /* jshint validthis: true */
        this.getEngagements = $resource(CONSTANT.baseURL + '/lectures/:lectureId/engagement', {lectureId:'@lectureId'});
    }
})();