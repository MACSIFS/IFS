(function() {
    'use strict';
    
    angular
        .module('student')
        .service('lectureService', lectureService);
        
    /* @ngInject */
    function lectureService($resource, CONSTANT) {
        console.log('Ready (Lecture Service)');
        
        /* jshint validthis: true */
        this.retrieveSlides = $resource(CONSTANT.baseURL + '/API/:id', {id:'@lectureId'});
        this.retrieveComments = $resource(CONSTANT.baseURL + '/lectures/:id/comments', {id:'@lectureId'});
    }
})();