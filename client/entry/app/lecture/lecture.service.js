(function() {
    'use strict';
    
    angular
        .module('entry')
        .service('lectureService', lectureService);
        
    /* @ngInject */
    function lectureService($resource) {
        console.log('Lecture Service Ready');
        
        /* jshint validthis: true */
        this.retrieveSlides = $resource('../../server/lecture/:id', {id:'@lectureId'});
    }
})();