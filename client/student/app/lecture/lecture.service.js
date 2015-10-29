(function() {
    'use strict';
    
    angular
        .module('student')
        .service('lectureService', lectureService);
        
    /* @ngInject */
    function lectureService($resource) {
        console.log('Ready (Lecture Service)');
        
        /* jshint validthis: true */
        this.retrieveSlides = $resource('../../server/lecture/:id', {id:'@lectureId'});
    }
})();