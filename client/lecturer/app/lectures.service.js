(function() {
    'use strict';

    angular
        .module('lecturer')
        .service('lecturesService', lecturesService);

    /* @ngInject */
    function lecturesService($resource, CONSTANT) {
        console.log('Ready (Lectures Service)');
        
        /* jshint validthis: true */
        this.getEngagements = $resource(CONSTANT.baseURL + '/lectures/:lectureId/engagements', {lectureId:'@lectureId'});
        this.retrieveComments = $resource(CONSTANT.baseURL + '/lectures/:lectureId/comments', {lectureId:'@lectureId'});
        this.retrieveLecture = $resource(CONSTANT.baseURL + '/lectures/:lectureId', {lectureId:'@lectureId'});
        this.lectures = $resource(CONSTANT.baseURL + '/lectures');
    }
})();
