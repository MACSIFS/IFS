(function() {
    'use strict';
    
    angular
        .module('student')
        .service('lectureService', lectureService);
        
    /* @ngInject */
    function lectureService($resource, CONSTANT) {
        console.log('Ready (Lecture Service)');
        
        /* jshint validthis: true */
        this.retrieveLecture = $resource(CONSTANT.baseURL + '/lectures/:lectureId', {lectureId:'@lectureId'});
        this.retrieveComments = $resource(CONSTANT.baseURL + '/lectures/:lectureId/comments', {lectureId:'@lectureId'});
        this.submitComment = $resource(CONSTANT.baseURL + '/lectures/:lectureId/comments', {lectureId:'@lectureId'});
        this.submitEngagement = $resource(CONSTANT.baseURL + '/lectures/:lectureId/engagements', {lectureId:'@lectureId'});
    }
})();